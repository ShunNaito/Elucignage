//マージンと描画領域の定義
//var margin = {top: 10, right: 10, bottom: 100, left: 40},
var margin = {top: 10, right: 10, bottom: 150, left: 40},
    //margin2 = {top: 430, right: 10, bottom: 20, left: 40},
    margin2 = {top: 530, right: 10, bottom: 20, left: 40},
    //width = 960 - margin.left - margin.right,
    width = 1000 - margin.left - margin.right,
    //height = 500 - margin.top - margin.bottom,
    height = 650 - margin.top - margin.bottom,
    //height2 = 500 - margin2.top - margin2.bottom;
    height2 = 650 - margin2.top - margin2.bottom;

var parseDate = d3.time.format("%Y%m").parse;

// スケールと出力レンジの定義
var x = d3.time.scale().range([0, width]),
    x2 = d3.time.scale().range([0, width]),
    y = d3.scale.linear().range([height, 0]),
    y2 = d3.scale.linear().range([height2, 0]);

// 軸の定義
var xAxis = d3.svg.axis().scale(x).orient("bottom"),
    xAxis2 = d3.svg.axis().scale(x2).orient("bottom"),
    yAxis = d3.svg.axis().scale(y).orient("left");

//ブラッシュ
var brush = d3.svg.brush()
    .x(x2)
    .on("brush", brushed);

// 線の定義
var line = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.close); });

var line2 = d3.svg.line()
    .x(function(d) { return x2(d.date); })
    .y(function(d) { return y2(d.close); });

// svgの定義
var svg = d3.select("#graph").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);
    //.append("g")
    //.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.append("defs").append("clipPath")
    .attr("id", "clip")
    .append("rect")
    .attr("width", width)
    .attr("height", height);

var focus = svg.append("g")
    .attr("class", "focus")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var context = svg.append("g")
    .attr("class", "context")
    .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

function drawGraph(){
    var obj = document.test.linkselect;
    var index = obj.selectedIndex;
    var href = obj.options[index].value;
    console.log(href);
    if(href != ""){
        tbox1();
        $('.focus').empty();
        $('.context').empty();
        // データを読み込む
        d3.csv("./data/"+href+".csv", function(error, data) {
            // データをフォーマット
            data.forEach(function(d) {
                d.date = parseDate(d.date);
                d.close = +d.close;
            });

        // データを入力ドメインとして設定
        // 同時にextentで目盛りの単位が適切になるようにする
        x.domain(d3.extent(data, function(d) { return d.date; }));
        // y.domain([0, d3.max(data.map(function(d) { return d.close; }))]);
        y.domain(d3.extent(data, function(d) { return d.close; }));
        x2.domain(x.domain());
        y2.domain(y.domain());

        // x軸をsvgに表示
        focus.append("g")
             .attr("class", "x axis")
             .attr("transform", "translate(0," + height + ")")
             .call(xAxis);

        // y軸をsvgに表示
        focus.append("g")
             .attr("class", "y axis")
             .call(yAxis)
             .append("text")
             .attr("transform", "rotate(-90)")
             .attr("y", 6)
             .attr("dy", ".71em")
             .style("text-anchor", "end")
             .text("Price ($)");

        // 画像の定義
        var imgList = ['mushroom'];

        // path要素をsvgに表示し、折れ線グラフを設定
        focus.append("path")
             .datum(data)
             .attr("class", "line")
             .attr("d", line);


        // 上のグラフに円を描画
        focus.append("g")
             .attr("class", "circles")
             .attr("clip-path", "url(#clip)")
             .selectAll('.circle')
             .data(data)
             .enter()
             .append("circle")
             .attr('class', 'circle')
             .attr("cx", function(d) {
                if(d.ArticleNumber != 0){
                    return x(d.date);
                }
             })
             .attr("cy", function(d) {
                if(d.ArticleNumber != 0){
                    return y(d.close);
                }
             })
             .attr("r", function(d) {
                if(d.ArticleNumber != 0){
                    return 5;
                }
             })
             .attr('id', function(d) {
                if(d.ArticleNumber != 0){
                    return "circle"+d.ArticleNumber;
                }
             })
             .attr("fill", 'steelblue')
             .on("click", function(d) {
                var titleHeight = document.getElementById("title").clientHeight;
                var searchboxHeight = document.getElementById("searchbox").clientHeight;
                var position = document.getElementById(d.ArticleNumber).offsetTop;

                // $("#list").animate({
                //     scrollTop : position
                // }, {
                // queue : false
                // });
                //現在の縦スクロール位置
                // var scrollPosition = document.getElementById("list").scrollTop;
                document.getElementById("list").scrollTop = position - (titleHeight + searchboxHeight + 10);
             });

        focus.append("g")
             .attr("class", "arrows")
             .attr("clip-path", "url(#clip)")
             .selectAll('.arrow')
             .data(data)
             .enter()
             .append('image')
             .attr("class", "arrow")
             .attr({
              'xlink:href': function (d) {
                if(d.arrow != 0){
                    return 'images/'+d.arrow+'.png';
                }
               },
               'width' : 50,
               'height': 50,
             })
             .attr("x", function(d) {
                if(d.arrow != 0){
                    return x(d.date)-25;
                }
             })
             .attr("y", function(d) {
                if(d.arrow != 0){
                    return y(d.close)-25;
                }
             })
             .on("click", function(d) {
                var titleHeight = document.getElementById("title").clientHeight;
                var searchboxHeight = document.getElementById("searchbox").clientHeight;
                var position = document.getElementById(d.ArticleNumber).offsetTop;

                // $("#list").animate({
                //     scrollTop : position
                // }, {
                // queue : false
                // });
                //現在の縦スクロール位置
                // var scrollPosition = document.getElementById("list").scrollTop;
                document.getElementById("list").scrollTop = position - (titleHeight + searchboxHeight + 10);
             });

        context.append("path")
               .datum(data)
               .attr("class", "line")
               .attr("d", line2);

        context.append("g")
               .attr("class", "x axis")
               .attr("transform", "translate(0," + height2 + ")")
               .call(xAxis2);

        context.append("g")
               .attr("class", "x brush")
               .call(brush)
               .selectAll("rect")
               .attr("y", -6)
               .attr("height", height2 + 7);

        // focus.append('image')
        //      .datum(data)
        //      .attr({
        //       'xlink:href': function (data) {
        //         return 'images/arrow2.png';
        //        },
        //        'width'     : 50,
        //        'height'    : 50,
        //        'x'         : 165,
        //        'y'         : -15,
        //        'class'     : 'arrow'
        //      });

        //     var iconimg = document.querySelector('.arrow');

        //     iconimg.addEventListener("click", function(){
        //         document.querySelector('.article').style.fontWeight = 'bolder';
        //     });

    });
    }
}

function brushed() {
    x.domain(brush.empty() ? x2.domain() : brush.extent());
    focus.select(".line").attr("d", line);
    focus.select(".x.axis").call(xAxis);
    focus.selectAll(".circle").attr("cx", function(d) {
        if(d.ArticleNumber != 0){
            return x(d.date);
        }
    })
    .attr("cy", function(d) {
        if(d.ArticleNumber != 0){
            return y(d.close);
        }
    });
    focus.selectAll(".arrow").attr("x", function(d) {
            if(d.arrow != 0){
                return x(d.date)-25;
            }
        })
        .attr("y", function(d) {
            if(d.arrow != 0){
                return y(d.close)-25;
            }
        });
}