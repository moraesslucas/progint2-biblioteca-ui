(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-afeb6c3e"],{"0e7a":function(a,e,t){},"392f":function(a,e,t){"use strict";var r=t("bc3a"),i=t.n(r),o=t("c4c6");function s(a,e){if(!(a instanceof e))throw new TypeError("Cannot call a class as a function")}function n(a,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(a,r.key,r)}}function l(a,e,t){return e&&n(a.prototype,e),t&&n(a,t),a}var c="https://protected-fjord-42747.herokuapp.com/livro/",u=function(){function a(){s(this,a)}return l(a,[{key:"buscarLivros",value:function(a){var e={headers:Object(o["a"])(),params:a},t=i.a.get(c,e);return t}},{key:"deleteLivro",value:function(a){return i.a.delete(c+a,{headers:Object(o["a"])()})}},{key:"buscarLivro",value:function(a){return i.a.get(c+a,{headers:Object(o["a"])()})}},{key:"criarLivro",value:function(a){return i.a.post(c,a,{headers:Object(o["a"])()})}},{key:"atualizarLivro",value:function(a,e){return i.a.put(c+a,e,{headers:Object(o["a"])()})}}]),a}();e["a"]=new u},a5ee:function(a,e,t){"use strict";var r=t("0e7a"),i=t.n(r);i.a},aafc:function(a,e,t){"use strict";t.r(e);var r=function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("div",{staticClass:"form-elements"},[t("div",{staticClass:"row"},[t("div",{staticClass:"flex xs12"},[a._l(a.validationErrors,(function(e){return t("va-notification",{key:e,attrs:{color:"danger"}},[a._v(" "+a._s(e.message)+" ")])})),t("va-card",{attrs:{title:"Novo Livro"}},[t("form",[t("div",{staticClass:"row"},[t("div",{staticClass:"flex md2 sm12 xs 12"},[t("p",[a._v("Nome")])]),t("div",{staticClass:"flex md10 sm12 xs12"},[t("va-input",{attrs:{placeholder:"Nome",removable:""},model:{value:a.livro.nome,callback:function(e){a.$set(a.livro,"nome",e)},expression:"livro.nome"}})],1),t("div",{staticClass:"flex md2 sm12 xs 12"},[t("p",[a._v("Editora")])]),t("div",{staticClass:"flex md10 sm12 xs12"},[t("va-input",{attrs:{placeholder:"Editora",removable:""},model:{value:a.livro.editora,callback:function(e){a.$set(a.livro,"editora",e)},expression:"livro.editora"}})],1),t("div",{staticClass:"flex md2 sm12 xs 12"},[t("p",[a._v("Autor")])]),t("div",{staticClass:"flex md10 sm12 xs12"},[t("va-input",{attrs:{placeholder:"Autor",removable:""},model:{value:a.livro.autor,callback:function(e){a.$set(a.livro,"autor",e)},expression:"livro.autor"}})],1),t("div",{staticClass:"flex md2 sm12 xs 12"},[t("p",[a._v("Ano de Publicação")])]),t("div",{staticClass:"flex md10 sm12 xs12"},[t("va-input",{attrs:{placeholder:"Ano de Publicação",type:"number",removable:""},model:{value:a.livro.anoPublicacao,callback:function(e){a.$set(a.livro,"anoPublicacao",e)},expression:"livro.anoPublicacao"}})],1),t("div",{staticClass:"flex md2 sm12 xs 12"},[t("p",[a._v("ISBN")])]),t("div",{staticClass:"flex md10 sm12 xs12"},[t("va-input",{attrs:{placeholder:"ISBN",removable:""},model:{value:a.livro.isbn,callback:function(e){a.$set(a.livro,"isbn",e)},expression:"livro.isbn"}})],1),t("div",{staticClass:"flex md12 sm12 xs12"},[t("va-button",{staticClass:"pull-right",attrs:{disabled:a.isDisabled,color:"info"},on:{click:a.criar}},[a._v(" Atualizar ")])],1)])])])],2)])])},i=[],o=t("392f"),s={name:"form-elements",data:function(){return{livro:{nome:"",autor:"",editora:"",anoPublicacao:"",isbn:""},isDisabled:!1,validationErrors:[]}},created:function(){this.readItem()},methods:{readItem:function(){var a=this;o["a"].buscarLivro(this.$route.params.id).then((function(e){return a.livro=e.data})).catch((function(a){return console.log(a)}))},clear:function(a){this[a]=""},criar:function(){var a=this;this.isDisabled=!0,o["a"].atualizarLivro(this.$route.params.id,this.livro).then((function(e){return a.$router.push({name:"livros"})})).catch((function(e){a.validationErrors=e.response.data.errors,a.isDisabled=!1}))}}},n=s,l=(t("a5ee"),t("2877")),c=Object(l["a"])(n,r,i,!1,null,null,null);e["default"]=c.exports},c4c6:function(a,e,t){"use strict";function r(){var a=JSON.parse(localStorage.getItem("user"));return a&&a.access_token?{Authorization:"Bearer ".concat(a.access_token)}:{}}t.d(e,"a",(function(){return r}))}}]);
//# sourceMappingURL=chunk-afeb6c3e.762d9f8f.js.map