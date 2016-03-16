function decode(a) {
    // ROT13 : a Caesar cipher 
    // letter -> letter' such that code(letter') = (code(letter) + 13) modulo 26
    return a.replace(/[a-zA-Z]/g, function(c){
      return String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
    });
  }

function gup() {
  var url = location.href;
  var name = "tpl".replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( url );
  return results == null ? null : results[1];
}

function Model(weight,nb,views){
//this.url = url;
this.weight = weight;
this.nb = nb[Math.floor((Math.random() * nb.length ))];
this._views = views;
Model.weights.push(this.weight);
Model.results.push(this);
this.tpl = this._views[this.nb].html;
}

Model.weights = [];
Model.results = [];

function destroy_all(){
    Model.weights = [];
    Model.results = [];
}

function balance(){
Model.weights = Model.weights.map(function(z){return z=Number((1/Model.weights.length).toFixed(2))});
}

Model.prototype = {
       show: function(){
        $('link').attr('href',this._views[this.nb].css);
        $('body').append(this.tpl);
        var x = $('.link').attr('href');
        $('.link').attr('href',decode(x));
        $( ".link" ).on( "click", function() {
            var z = $(this).attr('href');
            $(this).attr('href',decode(z));
        });
       },
     text: function(txt){
        var newText = $(this.tpl);
        $(newText).find("#text").html(txt);
        this.tpl = newText;
      },
     url: function(l){
        var newLink = $(this.tpl);
        $(newLink).find(".link").attr("href",l);
        this.tpl = newLink;
      },
      timer: function(time){
        if(new Date().getTime() >= time){
            this.remove_all();
        }
      }
};

Model.prototype.remove_all = function() {
  for (var i=0; i<Model.results.length; i++) {
    if (Model.results[i] == this && Model.weights[i] == this.weight) {
      Model.results.splice(i,1);
      Model.weights.splice(i,1);
    }
  }
};


function getRandom () {
    var num = Math.random(),
        s = 0,
        lastIndex = Model.weights.length - 1;

    for (var i = 0; i < lastIndex; ++i) {
        s += Model.weights[i];
        if (num < s) {
            return Model.results[i];
        }
    }

    return Model.results[lastIndex];
}




