<template>
    <div>
  <div class="goDemo">
    <div id="myDiagramDiv" style="width:1000px; height:600px; background-color: rgb(253,245,230);"></div>
    <a-button type="primary"@click="commander('undo')">撤销ctrl+z</a-button>&nbsp;
    <a-button @click="commander('redo')">重做ctrl+y</a-button>&nbsp;
    <a-button @click="save">保存</a-button>&nbsp;
    <a-button @click="preview">预览</a-button>&nbsp;
  </div>
    <p v-for="(item,index) in list" :key="index" style="text-align: left">
        {{index}}.{{item.name}}{{item.fix ? '√' : '--'}}
    </p>
    </div>
</template>

<script lang="ts">
/**
 * https://gojs.net.cn/api/index.html
 * 常见api：https://www.cnblogs.com/Zhushaoyu/p/9068943.html
 * 图形：https://gojs.net.cn/samples/shapes.html
 * 分组：https://gojs.net.cn/samples/grouping.html
 * 实例：https://gojs.net.cn/samples/draggableLink.html
 * 数据同步：https://gojs.net.cn/samples/updateDemo.html
 * html交互：https://gojs.net.cn/samples/htmlInteraction.html
 * 自定义右键菜单：https://gojs.net.cn/samples/customContextMenu.html
 * 缩放：https://gojs.net.cn/extensions/ZoomSlider.html
 * 多选：https://gojs.net.cn/extensions/ResizeMultiple.html
 * 拖动辅助线：https://gojs.net.cn/extensions/GuidedDragging.html
 * 链接：https://gojs.net.cn/extensions/Hyperlink.html
 * 节点上文字编辑：https://gojs.net.cn/extensions/TextEditor.html
 * 连线：https://gojs.net.cn/samples/draggableLink.html
 * 快捷键事件列表：https://gojs.net.cn/api/symbols/CommandHandler.html
 */
import Vue from 'vue';
// import go from'gojs';
import * as go from '../libs/go-module-free.js';

// 导入节点编辑器
// require('../../node_modules/gojs/extensions/TextEditor.js');

// 导入辅助线
// require('../../node_modules/gojs/extensions/GuidedDraggingTool.js');

export default Vue.extend({
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  data() {
      return {
          list: [
              {name: 'link右键', fix: false},
              {name: 'node右键', fix: false},
              {name: '线动效', fix: false},
              {name: '添加字节点', fix: false},
              {name: 'node文案修改', fix: false},
          ],
          myDiagram: null,
          model: null,
      }
  },
  mounted () {
      this.test0()
  },
  methods: {
      /**
       * 执行go内置的命令
       * https://gojs.net.cn/api/symbols/CommandHandler.html
       */
      commander(cmdName: string) {
          var mySelf = this as any;
          mySelf.myDiagram.commandHandler[cmdName]()
      },
      save() {
          var mySelf = this as any;
          console.log('当期数据',mySelf.myDiagram.model.toJson())
      },
      preview() {

      },
      info() {
        const h = this.$createElement;
        this.$info({
            title: 'This is a notification message',
            content: h('div', {}, [
            h('p', 'some messages...some messages...'),
            h('p', 'some messages...some messages...'),
            ]),
            onOk() {},
        });
        },
      test0 (): void {
        var mySelf = this as any;
        
        var $ = go.GraphObject.make;
        var model = $(go.GraphLinksModel);
        mySelf.myDiagram =
        $(go.Diagram, "myDiagramDiv",
        {
            "undoManager.isEnabled": true, // enable Ctrl-Z to undo and Ctrl-Y to redo
            "grid.visible":true,//显示网格
            initialContentAlignment: go.Spot.Center, // 居中显示
            "toolManager.mouseWheelBehavior": go.ToolManager.WheelZoom,//有鼠标滚轮事件放大和缩小，而不是向上和向下滚动
            "toolManager.hoverDelay": 100,//tooltip提示显示延时
            "toolManager.toolTipDuration": 10000,//tooltip持续显示时间
             //为单击
            //"clickCreatingTool.archetypeNodeData”创建的每个新节点指定要复制的数据对象：{文本：“新节点” }
            // 辅助线
            // draggingTool: new GuidedDraggingTool(),  // defined in GuidedDraggingTool.js
            //  "draggingTool.horizontalGuidelineColor": "blue",
            // "draggingTool.verticalGuidelineColor": "blue",
            // "draggingTool.centerGuidelineColor": "green",
            // "draggingTool.guidelineWidth": 1,
        });


        mySelf.myDiagram.toolManager.textEditingTool.defaultTextEditor = window.TextEditor;



        // change监听
        /**
         * https://gojs.net.cn/intro/changedEvents.html
         */
        //注意每当发生事务或撤消/重做时
        mySelf.myDiagram.addModelChangedListener(function(evt) {
            if(evt.isTransactionFinished) {
                mySelf.$message.info('数据修改');
                console.log('数据修改',evt.model)
            }
        });


        // 添加开始和结束节点
        // mySelf.myDiagram.add(
        //     $(go.Part, "Auto",
        //         $(
        //             go.Shape, 
        //             "Circle",
        //             { 
        //                 width: 40, 
        //                 height: 40, 
        //                 margin: 4, 
        //                 fill: "green",
        //                 stroke: "green", 
        //                 strokeWidth: 3,
        //                 // background: "#fff"，
        //             }
        //         ),
        //         $(go.TextBlock, "开始", { row: 1, column: 0, stroke: "#fff", font: "bold 13px 微软雅黑,Helvetica, bold Arial, sans-serif" })
        //     ),
        // );
        // mySelf.myDiagram.add(
        //     $(go.Part, "Auto",
        //         $(
        //             go.Shape, 
        //             "Circle", 
        //             { 
        //                 row: 0, column: 0,
        //                 width: 40, 
        //                 height: 40, 
        //                 margin: 4, 
        //                 fill: "red",
        //                 stroke: "red", 
        //                 strokeWidth: 3,
        //                 //color: "#fff",
        //                 // background: "#fff"
        //             }
        //         ),
        //         $(go.TextBlock, "结束", { row: 1, column: 0, stroke: "#fff", font: "bold 13px 微软雅黑,Helvetica, bold Arial, sans-serif"})
        //     )
        // );

        // https://gojs.net.cn/samples/stateChart.html
        mySelf.myDiagram.add(
            $(go.Node, "Spot", { 
                desiredSize: new go.Size(75, 75),
                location: new go.Point(0, -100)
                },
                new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
                $(go.Shape, "Circle",
                    {
                        fill: "#52ce60", /* green */
                        stroke: null,
                        portId: "",
                        fromLinkable: true, fromLinkableSelfNode: true, fromLinkableDuplicates: true,
                        toLinkable: true, toLinkableSelfNode: true, toLinkableDuplicates: true,
                        cursor: "pointer"
                    }),
                $(go.TextBlock, "Start",
                    {
                        font: "bold 16pt helvetica, bold arial, sans-serif",
                        stroke: "whitesmoke"
                    })
            )
        );
        mySelf.myDiagram.add(
            $(go.Node, "Spot", { 
                desiredSize: new go.Size(75, 75),
                location: new go.Point(0, 300)
                },
                new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
                $(go.Shape, "Circle",
                    {
                        fill: "maroon",
                        stroke: null,
                        portId: "",
                        fromLinkable: true, fromLinkableSelfNode: true, fromLinkableDuplicates: true,
                        toLinkable: true, toLinkableSelfNode: true, toLinkableDuplicates: true,
                        cursor: "pointer"
                    }),
                $(go.Shape, "Circle", { fill: null, desiredSize: new go.Size(65, 65), strokeWidth: 2, stroke: "whitesmoke" }),
                $(go.TextBlock, "End",
                    {
                        font: "bold 16pt helvetica, bold arial, sans-serif",
                        stroke: "whitesmoke"
                    })
            )
        );

        // 画布右键事件
        // also define a context menu for the diagram's background
        mySelf.myDiagram.contextMenu =
            $("ContextMenu",
            $("ContextMenuButton",
                $(go.TextBlock, "撤销"),
                { click: function(e, obj) { e.diagram.commandHandler.undo(); } },
                new go.Binding("visible", "", function(o) {
                                                return o.diagram.commandHandler.canUndo();
                                                }).ofObject()),
            $("ContextMenuButton",
                $(go.TextBlock, "重做"),
                { click: function(e, obj) { e.diagram.commandHandler.redo(); } },
                new go.Binding("visible", "", function(o) {
                                                return o.diagram.commandHandler.canRedo();
                                                }).ofObject()),
            // no binding, always visible button:
            $("ContextMenuButton",
                $(go.TextBlock, "新建节点"),
                { click: function(e, obj) {
                e.diagram.commit(function(d) {
                    var data = {};
                    d.model.addNodeData(data);
                    var part = d.findPartForData(data);  // must be same data reference, not a new {}
                    // set location to saved mouseDownPoint in ContextMenuTool
                    part.location = d.toolManager.contextMenuTool.mouseDownPoint;
                }, '新建节点');
                } })
            );


        // 节点事件回调
        function hanldeNodeClick () {
            console.log(mySelf.myDiagram.model.toJson())
            mySelf.info()
        }

        function hanldeNodeAddChildClick (e: any, obj: any) {
                // 所有的改变都必须在一个事务里面
                e.diagram.commit(
                    function(d: any) {
                        var data = {
                            key: "A11", 
                            name: "产品需求11", 
                            source: require("../assets/02.png")
                        };
                        // 添加节点
                        /**
                         * var data = mySelf.myDiagram.model.findNodeDataForKey（“ Delta”）;
                         * 如果（data！== null）data.color = “ red” ;这将不会更改“ Delta”节点的颜色。
                         *  修改节点的某个属性
                         *  如果（data！== null）myDiagram.model.setDataProperty（data，“ color”，“ red”）; //这将更新“ Delta”节点的颜色。
                         */
                        d.model.addNodeData(data);
                        var part = d.findPartForData(data);  // must be same data reference, not a new {}
                        // set location to saved mouseDownPoint in ContextMenuTool
                        part.location = d.toolManager.contextMenuTool.mouseDownPoint;

                        // 添加连线
                        /**
                         * 这里model是全局的，也可以使用commit回调参数d，d是全局
                         */
                        model.addLinkData({ from: "A1", to: "A11" })
                    }, '实物名称');
                    //TODO: 如何拿到点击节点的数据
                    // console.log('hanldeNodeAddChildClick',e);

            
        }

        
        // 检查节点文本输入
        function checkNodeInputText(textblock: any, oldstr: string, newstr: string) {
            // return newstr.length >= 3 && /[aeiouy]/i.test(newstr);
            return true
        }

        // 虚线动画
        function animation () {
        const loop = () => {
            var animationTimer = setTimeout(() => {
            const oldskips = mySelf.myDiagram.skipsUndoManager;
            mySelf.myDiagram.skipsUndoManager = true;
            // 虚线动画
            mySelf.myDiagram.links.each((link) => {
                const dashedLinkShape = link.findObject("dashedLink");
                if (dashedLinkShape) {
                const off = dashedLinkShape.strokeDashOffset - 3;
                // 设置（移动）笔划划动画
                dashedLinkShape.strokeDashOffset = (off <= 0) ? 60 : off;
                }
            });

            mySelf.myDiagram.skipsUndoManager = oldskips;
            loop();
            }, 180);
        }
        loop()
        }
        animation()


       //link tool tip
       function tooltipTextConverter(person : any){
            return JSON.stringify(person);
        }
        // Auto == go.Panel.Auto ,Auto为字符串参数
        const linkToolTip = $(go.Adornment, "Auto",
            $(go.Shape, { fill: "#FFFFCC" }),
            $(go.TextBlock, { margin: 4 },new go.Binding("text", "text"))
        )



        // define a simple Node template
        mySelf.myDiagram.nodeTemplate = $(
            go.Node, 
            new go.Binding("location", "loc").makeTwoWay(),
            // 配置文件
            { 
                background: "#fff",
                // 可修改大小
                resizable: true, 
                // 可旋转
                rotatable: true,
                // tooltip
                //toolTip
                mouseEnter: (e: any, obj: any, prev: any) => {
                    // mySelf.showNodeInfo(obj)
                    // 节点数据obj.data
                    console.log(e)
                },
                mouseLeave: (e: any, obj: any, prev: any) => {
                    // console.log(obj)
                }
            },
            // 右键事件
            {
                contextMenu:     // define a context menu for each node
                $("ContextMenu",  // that has one button
                    $("ContextMenuButton",$(go.TextBlock, 
                        {
                            text: "插入子节点\n我是换行文本",
                            margin: 7,
                            width: 100,
                            maxLines: 2,
                            textAlign: "left"
                        }
                    ),{ click: hanldeNodeAddChildClick }),
                    $("ContextMenuButton",$(go.TextBlock, "插入同级节点"),{ click: hanldeNodeClick }),
                    $("ContextMenuButton",$(go.TextBlock, "添加修改标签"),{ click: ()=>{} }),
                    $("ContextMenuButton",$(go.TextBlock, "添加引用标签"),{ click: ()=>{} }),
                    $("ContextMenuButton",$(go.TextBlock, "添加删除标签"),{ click: ()=>{} }),
                    $("ContextMenuButton",$(go.TextBlock, "编辑标签"),{ click: ()=>{} }),
                    $("ContextMenuButton",$(go.TextBlock, "一键展开/收缩"),{ click: ()=>{} }),
                    $("ContextMenuButton",$(go.TextBlock, "查看节点详情"),{ click: ()=>{} }),
                    $("ContextMenuButton",$(go.TextBlock, "插卡系统架构图"),{ click: ()=>{} }),
                    $("ContextMenuButton",$(go.TextBlock, "保存为业务片段ctrl+g"),{ click: ()=>{} }),
                    //TODO: 如何触发gojs集成的键盘事件
                    $("ContextMenuButton",$(go.TextBlock, "复制ctrl+c"),{ click: ()=>{} }),
                    $("ContextMenuButton",$(go.TextBlock, "剪切ctrl+x"),{ click: ()=>{} }),
                    $("ContextMenuButton",$(go.TextBlock, "删除del"),{ click: ()=>{} }),
                    $("ContextMenuButton",$(go.TextBlock, "粘贴ctrl+v"),{ click: ()=>{} })
                    // more ContextMenuButtons would go here
                )  // end Adornment
            },
            $(
                go.Picture,
                // Pictures should normally have an explicit width and height.
                // This picture has a red background, only visible when there is no source set
                // or when the image is partially transparent.
                { margin: 5, width: 20, height: 20, background: "red" },
                // Picture.source is data bound to the "source" attribute of the model data
                new go.Binding("source"),
            ),
            $(
                go.TextBlock,
                "请输入节点名称",  // the initial value for TextBlock.text
                // some room around the text, a larger font, and a white stroke:
                { 
                    margin: 12, 
                    stroke: "#000", 
                    font: "bold 16px sans-serif",
                    // 是否可编辑
                    editable: true, 
                    textValidation: checkNodeInputText 
                },
                // TextBlock.text is data bound to the "name" attribute of the model data
                new go.Binding("text", "name")
            ),
            // 编辑人信息
            // $(go.Panel, { location: new go.Point(0, -40) },$(go.TextBlock, "A Title", { font: "bold 24pt sans-serif", stroke: "green" }))
        );


        // 定义个节点组template
        /**
         * https://gojs.net.cn/samples/grouping.html
         * https://blog.csdn.net/qq_29832217/article/details/98479041
         */
        mySelf.myDiagram.groupTemplate  = $(go.Group, "Vertical",
          {
            selectionObjectName: "PANEL",  // selection handle goes around shape, not label
            ungroupable: true , // enable Ctrl-Shift-G to ungroup a selected Group
            //  layout: $(go.TreeLayout, // 1个特殊的树形排列 Diagram.layout布局
            //      { angle: 0,  //90可以竖直排列
            //        layerSpacing: 60
            //     })
            contextMenu:     // define a context menu for each node
            $("ContextMenu",  // that has one button
                $("ContextMenuButton",$(go.TextBlock, "组右键菜单1"),{ click: ()=>{} }),
                $("ContextMenuButton",$(go.TextBlock, "组右键菜单2"),{ click: ()=>{} }),
                // more ContextMenuButtons would go here
            )  // end Adornment
          },
          $(go.TextBlock,
            {
              font: "bold 19px sans-serif",
              isMultiline: false,  // don't allow newlines in text
              editable: false,  // allow in-place editing by user
            },
            new go.Binding("text", "name").makeTwoWay(),
            new go.Binding("stroke", "color")),
          $(go.Panel, "Auto",
            { name: "PANEL" },
            $(go.Shape, "Rectangle",  // the rectangular shape around the members
              {
                fill: "rgba(255,255,255,0.2)", stroke: "gray", strokeWidth: 2,
              
              }),
            $(go.Placeholder, { margin: 10, background: "transparent" })  // represents where the members are
          ),
          $(go.TextBlock, "引",
            {
            font: "bold 12pt helvetica, bold arial, sans-serif",
            stroke: "red",
          })
     
        );

        // 定义集合，存储实线、虚线模板
        const templmap = new go.Map()
        const color = '#000'

        // 默认连线模板
        const defaultLinkTemplate = $(
        go.Link,
        {
            toolTip: linkToolTip,
            // 贝塞尔
            // curve: go.Link.Bezier
        },
        // 右键事件
        {
            contextMenu:     // define a context menu for each node
            $("ContextMenu",  // that has one button
                $("ContextMenuButton",$(go.TextBlock, "实线右键菜单1"),{ click: ()=>{} }),
                $("ContextMenuButton",$(go.TextBlock, "实线右键菜单2"),{ click: ()=>{} }),
                $("ContextMenuButton",$(go.TextBlock, "实线右键菜单3"),{ click: ()=>{} }),
                $("ContextMenuButton",$(go.TextBlock, "实线右键菜单4"),{ click: ()=>{} }),
                // more ContextMenuButtons would go here
            )  // end Adornment
        },
        $(go.Shape, { stroke: color, strokeWidth: 1 }),
        $(go.Shape, { toArrow: 'Standard', fill: color, stroke: color, strokeWidth: 1 }),
        $(go.TextBlock,                        // this is a Link label
                new go.Binding("text", "text"))
        )

        // 虚线连线模板，关键属性：strokeDashArray: [6, 3]
        const dashedLinkTemplate = $(
        go.Link,
        {
            toolTip: linkToolTip,
            // 贝塞尔
            // curve: go.Link.Bezier
        },
        // 右键事件
        {
            contextMenu:     // define a context menu for each node
            $("ContextMenu",  // that has one button
                $("ContextMenuButton",$(go.TextBlock, "虚线右键菜单1"),{ click: ()=>{} }),
                $("ContextMenuButton",$(go.TextBlock, "虚线右键菜单2"),{ click: ()=>{} }),
                $("ContextMenuButton",$(go.TextBlock, "虚线右键菜单3"),{ click: ()=>{} }),
                $("ContextMenuButton",$(go.TextBlock, "虚线右键菜单4"),{ click: ()=>{} }),
                // more ContextMenuButtons would go here
            )  // end Adornment
        },
        // name: 'dashedLink'，后面动画用到
        $(go.Shape, { name: 'dashedLink', stroke: color, strokeWidth: 1, strokeDashArray: [6, 3] }),
        $(go.Shape, { toArrow: 'Standard', fill: color, stroke: color, strokeWidth: 1 }),
        $(go.TextBlock,                        // this is a Link label
                new go.Binding("text", "text"))
        )

        templmap.add('', defaultLinkTemplate);
        // dashed 为名称，描述时用属性 category: 'dashed' 指定
        templmap.add('dashed', dashedLinkTemplate);

        mySelf.myDiagram.linkTemplateMap = templmap;




        model.nodeDataArray = 
        [ 
            // note that each node data object holds whatever properties it needs;
            // for this app we add the "name" and "source" properties
            /**
             * loc的值可以有两种形式，如果需要实现双向绑定，则在后面加上.makeTwoWay()方法，例如go.Binding("location", "loc").makeTwoWay()
             * loc:new go Point(x,y) 使用方式 go.Binding("location", "loc")
             * loc:"x,y" 使用方式：go.Binding（“ location”，“ loc”，go.Point.parse）
             */

            /**
             * 通过isGroup确定是否为组节点,
             * 通过group指定组节点key
             */
            { key: "A", name: "产品需求产品需求产品需求", group: 'g--001', source: require("../assets/02.png"), loc: new go.Point(0,0) },
            { key: "A1", name: "产品需求1", group: 'g--001', source: require("../assets/02.png"), loc: new go.Point(-45,98) },
            { key: "A2", name: "产品需求2", group: 'g--001', source: require("../assets/02.png"), loc: new go.Point(167,99) },
            { key: 'g--001', name: "需求组", isGroup: true},
            { key: "B", name: "研发开发", source: require("../assets/02.png"), loc: new go.Point(269,2) },
            { key: "C", name: "测试测试",  source: require("../assets/02.png") , loc: new go.Point(396,3)},
            { key: "D" /* Empty node data */  , loc: new go.Point(539,4)},
            // 也可以是空节点
            // { /* Empty node data */  }
            { key: "A11", name: "产品需求11", source: require("../assets/02.png"), loc: new go.Point(-127,186) },
        ];

        model.linkDataArray =  [ 
            {"from":"A", "to":"B", "category":""},
            {"from":"B", "to":"C", "category":""},
            {"from":"C", "to":"D", "category":"dashed"},
            {"from":"A", "to":"A1", "text":"20%", "category":"dashed"},
            {"from":"A", "to":"A2", "text":"80%", "category":"dashed"},
            {"from":"A1", "to":"A11"}
        ];

        mySelf.myDiagram.model = model;

      }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
