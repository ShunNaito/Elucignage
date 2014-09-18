var xmlFiles = new Array("981114074.xml","981115231.xml","981125080.xml");
$(function(){
    // カウンターを生成
    var counter = 0;
    var j = 0;
    // ボタンがクリックされた時の処理
    $(":button").click(function() {
        if(counter == 0){
            for(var i=0; i<xmlFiles.length; i++){
                // 「data.xml」を読み込む
                $.get("./data/" + xmlFiles[i],
                    {},
                    createList,
                    "xml"
                );
            }
            counter = 1; // 一度だけ実行させる
        }
    });

    // 表を作成する関数
    var createList = function(xml) {
        // datasetタグの要素を繰り返し処理する
        $(xml).find("DOC").each(function(){

            // data_labelタグのテキストを取り出す
            var label = $(this).find("TEXT").text();
            // header行にラベルの列を追加する
            $("#list").append("<div class='article' id='article" + j +"' style='width: auto; height: 25%; overflow: auto; margin-top: 0.1em; background-color: #ffffff; border: 1px #c0c0c0 solid; color: #000000;' onClick='viewSource(" + j +")'>" + label + "</div>");
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

