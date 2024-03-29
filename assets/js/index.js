var suggestions = document.getElementById('suggestions');
var search = document.getElementById('search');

if (search !== null) {
  document.addEventListener('keydown', inputFocus);
}

function inputFocus(e) {
  if (e.ctrlKey && e.key === '/' ) {
    e.preventDefault();
    search.focus();
  }
  if (e.key === 'Escape' ) {
    search.blur();
    suggestions.classList.add('d-none');
  }
}

document.addEventListener('click', function(event) {

  var isClickInsideElement = suggestions.contains(event.target);

  if (!isClickInsideElement) {
    suggestions.classList.add('d-none');
  }

});

/*
Source:
  - https://dev.to/shubhamprakash/trap-focus-using-javascript-6a3
*/

document.addEventListener('keydown',suggestionFocus);

function suggestionFocus(e) {
  const suggestionsHidden = suggestions.classList.contains('d-none');
  if (suggestionsHidden) return;

  const focusableSuggestions= [...suggestions.querySelectorAll('a')];
  if (focusableSuggestions.length === 0) return;

  const index = focusableSuggestions.indexOf(document.activeElement);

  if (e.key === "ArrowUp") {
    e.preventDefault();
    const nextIndex = index > 0 ? index - 1 : 0;
    focusableSuggestions[nextIndex].focus();
  }
  else if (e.key === "ArrowDown") {
    e.preventDefault();
    const nextIndex= index + 1 < focusableSuggestions.length ? index + 1 : index;
    focusableSuggestions[nextIndex].focus();
  }

}

/*
Source:
  - https://github.com/nextapps-de/flexsearch#index-documents-field-search
  - https://raw.githack.com/nextapps-de/flexsearch/master/demo/autocomplete.html
*/

(function(){

  var index = new FlexSearch.Document({
    encode: false,
    split: /\s+/,
    tokenize: "forward",
    cache: 50,
    document: {
      id: 'id',
      store: [
        "href", "title", "description"
      ],
      index: ["title", "description", "content"]
    }
  });


  // Not yet supported: https://github.com/nextapps-de/flexsearch#complex-documents
  var wiki = [
    {{ range $index, $page := (where .Site.Pages "Section" "wiki") -}}
      {
        id: {{ $index }},
        href: "{{ .Permalink }}",
        title: {{ .Title | jsonify }},
        description: {{ .Params.description | jsonify }},
        content: {{ .Content | jsonify }}
      },
    {{ end -}}
  ];


  // https://discourse.gohugo.io/t/range-length-or-last-element/3803/2

  {{ $list := (where .Site.Pages "Section" "wiki") -}}
  {{ $len := (len $list) -}}

  index.add(
    {{ range $index, $element := $list -}}
      {
        id: {{ $index }},
        href: "{{ .RelPermalink }}",
        title: {{ .Title | jsonify }},
        {{ with .Description -}}
          description: {{ . | jsonify }},
        {{ else -}}
          description: {{ .Summary | plainify | jsonify }},
        {{ end -}}
        content: {{ .Plain | jsonify }}
      })
      {{ if ne (add $index 1) $len -}}
        .add(
      {{ end -}}
    {{ end -}}
  ;

  search.addEventListener('input', show_results, true);
  suggestions.addEventListener('click', accept_suggestion, true);

  function show_results(){
    const maxResult = 7;

    var value = this.value;
    var results = index.search(value, {limit: maxResult, enrich: true});

    suggestions.classList.remove('d-none');
    suggestions.innerHTML = "";

    //flatSearch now returns results for each index field. create a single list
    const flatResults = {}; //keyed by href to dedupe results
    for (const result of results.flatMap(r => r.result)) {
      flatResults[result.doc.href] = result.doc;
    }

    //construct a list of suggestions list
    for(const href in flatResults) {
        const doc = flatResults[href];

        const entry = document.createElement('div');
        entry.innerHTML = '<a href><span></span><span></span></a>';

        entry.querySelector('a').href = href;
        entry.querySelector('span:first-child').textContent = doc.title;
        entry.querySelector('span:nth-child(2)').textContent = doc.description.slice(0,100);

        suggestions.appendChild(entry);
        if(suggestions.childElementCount == maxResult) break;
    }
  }

  function accept_suggestion(){

      while(suggestions.lastChild){

          suggestions.removeChild(suggestions.lastChild);
      }

      return false;
  }

}());
