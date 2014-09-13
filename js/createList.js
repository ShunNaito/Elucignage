var xmlFiles = new Array("d.xml","d1.xml","d2.xml")
$(function(){
    // カウンターを生成
    var counter = 0;
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
        $(xml).find("del").each(function(){

            // data_labelタグのテキストを取り出す
            var label = $(this).text();

            // header行にラベルの列を追加する
            $("#list").append("<div class='article' style='width: auto; height: 25%; overflow: auto; margin-top: 0.1em; background-color: #ffffff; border: 1px #c0c0c0 solid; color: #000000;'>" + label + "</div>");
        });
    };
});