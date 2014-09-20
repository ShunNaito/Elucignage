var xmlFiles = new Array("981114074.xml","981115231.xml","981125080.xml");
$(function(){
    // ボタンがクリックされた時の処理
    $(":button").click(function() {
        for(var i=0; i<xmlFiles.length; i++){
	    // リストの要素を空に
	    $('#list').empty();

            // 「data.xml」を読み込む
            $.get("./data/" + xmlFiles[i],
                  {},
                  createList,
                  "xml"
                 );
        }
    });
    
    // 表を作成する関数
    var createList = function(xml) {
	// カウンターを生成
	var j = 0;

        // datasetタグの要素を繰り返し処理する
        $(xml).find("DOC").each(function(){

            // data_labelタグのテキストを取り出す
            var label = $(this).find("TEXT").text();
            // header行にラベルの列を追加する
	    var $div = $('<div>')
		    .attr({"id": 'article' + j,
			   "class": 'article',
			   "onClick": 'viewSource(' + j + ')'})
		    .text(label);;
	    $('#list').append($div);
            j++;
        });
    };
});

//本文を表示させる
function viewSource(i){
    $('.article').remove();
    $.get("./data/" + xmlFiles[i],
        {},
        createList2,
        "xml"
    );
}

var createList2 = function(xml) {
    // datasetタグの要素を繰り返し処理する
    $(xml).find("DOC").each(function(){

        // data_labelタグのテキストを取り出す
        var label = $(this).find("TEXT").text();
        // header行にラベルの列を追加する
        $("#list").append("<div style='width: auto; height: 100%; overflow: auto; margin-top: 0.1em; background-color: #ffffff; border: 1px #c0c0c0 solid; color: #000000;'>" + label + "</div>");
    });
};

