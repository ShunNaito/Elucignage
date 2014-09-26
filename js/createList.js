var xmlFiles = new Array("980214080.xml","980324105.xml","980527181.xml","981114074.xml","981115231.xml","981125080.xml","990405108.xml","990530053.xml","990606194.xml","990610074.xml","990617020.xml","990624031.xml","990714086.xml","990717070.xml","990817066.xml","990824079.xml","990828074.xml","990917084.xml","990924069.xml","990928069.xml");

// ボタンがクリックされた時の処理
function tbox1(num) {
    $("#circle"+num).attr("r",5);
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
}

// 表を作成する関数
var createList = function(xml) {
    var label = "";
    var num;
    // DOCNOの値を取り出す
    $(xml).find("DOCNO").each(function(){
        num = $(this).text();
    });
    var $div = $('<div>')
        .attr({"id": num,
       "class": 'article',
       "onClick": 'viewSource('+ num +')'});
    // datasetタグの要素を繰り返し処理する
    $(xml).find("del").each(function(){
        // data_labelタグのテキストを取り出す
        label = $(this).text();
        label += "...";
        $div.append(label+'<br>');
    });
    // header行にラベルの列を追加する
    if(label != 0){
        $('#list').append($div);
    }
};

//本文を表示させる
function viewSource(num){
    $("#circle"+num).attr("r",10);
    var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    console.log(scrollY);
    $('.article').remove();
    $.get("./data/" + num +".xml",
        {},
        createList2,
        "xml"
    );
}

var createList2 = function(xml) {
    var num;
    // DOCNOの値を取り出す
    $(xml).find("DOCNO").each(function(){
        num = $(this).text();
    });
    // datasetタグの要素を繰り返し処理する
    $(xml).find("DOC").each(function(){
        // data_labelタグのテキストを取り出す
        var label = $(this).find("TEXT").text();
        // header行にラベルの列を追加する
        $("#list").append("<div style='width: auto; height: 100%; overflow: auto; margin-top: 0.1em; background-color: #ffffff; border: 1px #c0c0c0 solid; color: #000000;' onClick='tbox1(" + num + ")'>" + label + "</div>");
    });
};