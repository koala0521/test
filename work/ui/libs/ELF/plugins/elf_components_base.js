/*
* Created by lijianwei on 2016/5/13.
*
* 确认提示框组件
*  Elf.components.confirm(options);
*  @parameters
*  options
*      width Number default null
*      height Number default null
*      minWidth String default 200px 限制最小宽度，提示文字过少时，保证样式效果
*      maxWidth String default 300px 限制最大宽度，提示文字过多时，保证样式效果
*      maxHeight Number default null
*      modle Boolean default true 是否显示遮罩
*      title String default null 标题
*      text String Not Null 提示文字
*      buttons Objext key-value(key String ,value function) default {"确定":function(){}}
*      opacity Number default 0 不设置，透明度（背景色透明度）
*      target Element objext default document.body
**/
Elf.components.confirm=function(options){
    options = Elf.utils.extend({
        width:"",
        minWidth:"200px",
        minHeight:"",
        maxWidth:"80%",
        maxHeight:"",
        height:"",
        modle:true,
        buttons:{"确定":function(){}},
        title:"",
        text:"温馨提示",
        align:"",
        opacity:0,
        target:document.body
    },options);
    //容器
    var confirm=Elf.controls({
        name: "div",className: "elf_confirm"
    });    
    function hidden(){
        if(!!confirm){
            Elf.effects.hidden(confirm,300,close);
        }
    }
    function close(){
        confirm.triggerElement.focus();
        Elf.utils.remove(confirm);
    }
    function init(){
        confirm.triggerElement =document.activeElement;
        confirm.triggerElement.blur();
        confirm.options=options;
        if(options.modle){
            confirm.mask=Elf.createChild(confirm,{
                name: "div",className: "elf_confirm_mask"
            });
        }
        //内容
        confirm.body=Elf.createChild(confirm,{
            name: "div",className: "elf_confirm_body"
        });
        //背景
        confirm.background=Elf.createChild(confirm.body,{
            name: "div",className: "elf_confirm_bg"
        });
        confirm.content=Elf.createChild(confirm.body,{
            name: "div",className: "elf_confirm_content"
        });
        //标题
        if(options.title){
            confirm.titleNode=Elf.createChild(confirm.content,{
                name: "h2",
                className: "elf_confirm_title"
            });
            confirm.titleNode.innerHTML=options.title;
        }
        //提示语
        if(options.text){
            confirm.textNode=Elf.createChild(confirm.content,{
                name: "p",
                className: "elf_confirm_text"
            });
            confirm.textNode.innerHTML=options.text;
        }
        //按钮区
        confirm.buttonGroup=Elf.createChild(confirm.body,{
            name: "div",
            className: "elf_confirm_buttonGroup"
        });
        if(options.buttons){
            confirm.btns=[];
            var i=0;
            for(var key in options.buttons){
                confirm.btns[i]=Elf.createChild(confirm.buttonGroup,{
                    name: "a",
                    className: "elf_confirm_button"
                });
                confirm.btns[i].innerHTML=key;
                Elf.xEvents.onXClick(confirm.btns[i],function (event){
                    hidden();
                    confirm.options.buttons[event.target.innerHTML].call(this);
                });
                i++;
            }
        }
        if(options.target){
            options.target.appendChild(confirm);
        }
        //var width=confirm.body.clientWidth;
        var height=confirm.body.clientHeight;
        if(options.maxWidth){
            confirm.body.style.maxWidth=options.maxWidth;
        }
        if(options.minWidth){
            confirm.body.style.minWidth=options.minWidth;
        }
        if(options.width){
            confirm.body.style.width=options.width;
        }
        confirm.body.style.top=(height/2*-1)+"px";
    }
    init();
    return confirm;
};
 /*
 * Created by lijianwei on 2016/5/13.
 * 自动消失提示组件
 *  Elf.components.toast(options);
 *  @parameters
 *  options
 *      width Number default null
 *      height Number default null
 *      minWidth String default 200px 限制最小宽度，提示文字过少时，保证样式效果
 *      maxWidth String default 300px 限制最大宽度，提示文字过多时，保证样式效果
 *      maxHeight Number default null
 *      holdtime Number default 1000 停留时间（单位毫秒）
 *      text String Not Null 提示文字
 *      opacity Number default 0 不设置，透明度（背景色透明度）
 *      target Element objext default document.body
 **/
Elf.components.toast=function(options){
    options = Elf.utils.extend({
        width:"",
        minWidth:"60px",
        maxWidth:"80%",
        minHeight:"",
        maxHeight:"",
        height:"",
        holdtime:1000,
        text:"温馨提示",
        opacity:0,
        target:document.body
    },options);
    //容器
    var toast=Elf.controls({
        name: "div",className: "elf_toast"
    });
    toast.body=Elf.createChild(toast,{
        name: "div",className: "elf_toast_body"
    });
    if(options.html){
        toast.body.innerHTML = options.html;
    }else{
        toast.bg=Elf.createChild(toast.body,{
            name: "div",className: "elf_toast_bg"
        });
        toast.body.text=Elf.createChild(toast.body,{
            name: "div",className: "elf_toast_text"
        });
        toast.body.text.innerHTML=options.text;
    }
    if(options.target){
        options.target.appendChild(toast);
    }
    if(options.holdtime){
        setTimeout(function(){
            Elf.effects.hidden(toast,300,remove);
        },options.holdtime);
    }
    function remove(){
        Elf.utils.remove(toast);
        if(typeof options.callback==="function"){
            options.callback.call(this);
        }
    }
    return toast;
};
/*
 * Created by lijianwei on 2016/5/13.
 * loading组件
 *  Elf.components.loading(options);
 *  @parameters
 *  options
 *      width Number default 64
 *      height Number default 64
 *      color String default #03b4fa
 *      target Element Object default document.body
 **/
(function(){
    function init(){
        Elf.components.loading.root=Elf.controls({
            name: "div",className: "elf_loading"
        });
        Elf.components.loading.mask=Elf.createChild(Elf.components.loading.root,{
            name: "div",className: "elf_loading_mask"
        });
        Elf.components.loading.position=Elf.createChild(Elf.components.loading.root,{
            name: "div",className: "elf_loading_position"
        });
        Elf.components.loading.frames=Elf.createChild(Elf.components.loading.position,{
            name: "ul",className:"elf_loading_frames elf_loading_rotate"
        });
        //Elf.components.loading.frames
        for(var i=1;i<=12;i++){
            Elf.createChild(Elf.components.loading.frames,{
                name: "li",
                className:"elf_loading_frames_"+i
            });
        }
    }
    Elf.utils.extend(Elf.components,{
        loading:function(options,param){
            if (typeof options == 'string'){
                return Elf.components.loading.methods[options](this,param);
            }
            options = Elf.utils.extend({
                width:"64",
                height:"64",
                color:"#03b4fa",
                target:document.body
            },options);
            if(!Elf.components.loading.root){
                init(options,param);
                if(options.target){
                    options.target.appendChild(Elf.components.loading.root);
                }
            }
            Elf.components.loading.count=Elf.components.loading.count>=0?Elf.components.loading.count:0;
            Elf.components.loading.count+=1;
        }
    });
    Elf.components.loading.count=0;
    Elf.components.loading.methods = Elf.utils.extend({},{
        close:function(){
            Elf.components.loading.count-=1;
            if(Elf.components.loading.count<=0 && !!Elf.components.loading.root){
                Elf.effects.hidden(Elf.components.loading.root,null,function(){
                    Elf.components.loading.root=Elf.utils.remove(Elf.components.loading.root);
                });
            }
        }
    });
})(Elf);

/*
 * Created by lijianwei on 2016/5/13.
 * 复选框
 *  Elf.components.checkbox();
 *  @parameters
 *  options
 *      label String default null 显示标签
 *      labelAlign String default null right || left
 *      target Element Object default document.body
 **/
(function(){
    function isChecked(target,params){
        return Elf.utils.hasClass(target.check,"checked");
    }
    function checked(target,params){
        if(!isChecked(target,params)){
            Elf.utils.addClass(target.check, "checked");
            Elf.utils.attr(target.check, "checked", "checked");
            Elf.utils.attr(target.hiddenCheck, "checked", "checked");
            target.hiddenCheck.checked="checked";
            fireChange(target,params);
        }
    }
    function unCheked(target,params){
        if(isChecked(target,params)){
            Elf.utils.removeClass(target.check,"checked");
            Elf.utils.removeAttr(target.check,"checked");
            target.hiddenCheck.checked="";
            Elf.utils.removeAttr(target.hiddenCheck,"checked");
            fireChange(target,params);
        }
    }
    function fireChange(target,params){
        if(typeof target.options.onChange =="function"){
            target.options.onChange.call(target,isChecked(target,params));
        }
    }
    function toggleChecked(target,params){
        if(isChecked(target,params)){
            unCheked(target,params);
        }else{
            checked(target,params);
        }
    }
    function init(target,params){
        if(typeof params=="string"){
            Elf.utils.addClass(target,params);
        }
        target.check=Elf.controls.createElement("span","elf-check");
        target.hiddenCheck=Elf.controls.createElement("input","elf-hidden-check",{type:"checkbox"});

        if(target.options.required){
            Elf.utils.attr(target.hiddenCheck,"required","required");
        }
        Elf.controls.appendTo(target.hiddenCheck,target.check);
        Elf.controls.appendTo(target.check,target);
        if(target.options.labelHtml){
            target.labelHtml=Elf.controls.createElement("span","elf-label-html",{innerHTML:target.options.labelHtml});
            if(target.options.labelAlign=="left"){
                Elf.controls.prependTo(target.labelHtml,target);
            }else{
                Elf.controls.appendTo(target.labelHtml,target);
            }
        }else if(target.options.label){
            target.label=Elf.controls.createElement("label","elf-label",{innerHTML:target.options.label});
            if(target.options.labelAlign=="left"){
                Elf.controls.prependTo(target.label,target);
            }else{
                Elf.controls.appendTo(target.label,target);
            }
            Elf.xEvents.bind(target.label,"click",function(event){
                event.stopPropagation();
                toggleChecked(target,params);
            });
        }
        if(target.options.checked){
            Elf.utils.addClass(target.check,"checked");
            Elf.utils.attr(target.check,"checked","checked");
        }
        Elf.xEvents.bind(target.check,"click",function(event){
            //event.stopPropagation();
            toggleChecked(target,params);
        });
        if(target.options.target){
            Elf.controls.appendTo(target,target.options.target);
        }
    }
    Elf.utils.extend(Elf.components,{
        checkbox:function(options,params){
            if (typeof options == 'string'){
                return Elf.components.checkbox.methods[options](params);
            }
            var attrs=options;
            options = Elf.utils.extend({
                width:"64",
                height:"64",
                label:"",
                labelAlign:"right",
                target:""
            },options);
            //var me=document.createDocumentFragment();
            var me=Elf.controls.createElement("div","elf-checkbox");
            me.options=options;
            me.attrs=attrs;
            init(me,params);
            return me;
        }
    });
    Elf.components.checkbox.methods = {
        checked:function(target,params){
            return checked(target,params);
        },
        unChecked:function(target,params){
            return unCheked(target,params);
        },
        isChecked:function(target,params){
            return isChecked(target,params);
        }
    };
})(Elf);
/*
 * Created by lijianwei on 2016/5/13.
 * table cells
 *  Elf.components.cells();
 *  @parameters
 *  options
 *      cols:[] String default null 显示标签
 *      labelAlign String default null right || left
 *      target Element Object default document.body
 **/
(function(){
    Elf.utils.extend(Elf.components,{
        cells:function(options,params){
            if (typeof options == 'string'){
                return Elf.components.cells.methods[options](params);
            }
            options = Elf.utils.extend({
                cols:[
                    {
                        width:"",
                        className:""
                    }
                ],
                rows:1
            },options);
            //var me=document.createDocumentFragment();
            var me=Elf.controls.createElement("div","table");
                me.rows=[];
                me.options=options;

            for(var i=0;i<me.options.rows;i++){
                var row=Elf.controls.createElement("div","table-row");
                var cells=[];
                Elf.utils.iterate(me.options.cols,function(index,item){
                    var cell=Elf.controls.createElement("div","table-cell");
                    if(item.width){
                        Elf.utils.css("width",item.width);
                    }
                    if(item.className){
                        Elf.utils.addClass(cell,item.className);
                    }
                    cells.push(cell);
                    Elf.controls.appendTo(cell,row);
                });
                me.rows.push(cells);
                Elf.controls.appendTo(row,me);
            }
            if(me.options.target){
                Elf.controls.appendTo(me,me.options.target);
            }
            //init(me,params);
            return me;
        }
    });
    Elf.components.cells.methods = {
        checked: function (target, params) {
            return checked(target, params);
        },
        unChecked: function (target, params) {
            return unCheked(target, params);
        },
        isChecked: function (target, params) {
            return isChecked(target, params);
        }
    };
})(Elf);
/****************************************************************************************
 * update by lijianwei on 2016/12/05.
 * 弹出框组件
 *  Elf.components.popup(options);
 *  @parameters
 *  options
 *      width Number default null
 *      height Number default null
 *      modle Boolean default true 是否显示遮罩
 *      menus Objext key-value(key String ,value function) default {"确定":function(){}}
 *      target Element objext default document.body
 ****************************************************************************************/
(function(){    
    function init(target,params){
        //解决点击按钮后，按回车键继续触发事件的问题
        var options=target.options;
        target.triggerElement =document.activeElement;
        target.triggerElement.blur();
        Elf.utils.addClass(target,'flex-box flex-justify-center flex-align-items-center')
        //target.body=Elf.controls.createElement("div","elf-popup-body flex-box flex-justify-center flex-align-items-center");
        target.background=Elf.controls.createElement("div","elf-popup-bg");

        target.closer=Elf.controls.createElement("div","elf-popup-closer");
        if(options.closeClass){
            Elf.utils.addClass(target.closer,options.closeClass);
        }
        target.content=Elf.controls.createElement("div","elf-popup-content");
        target.menus=Elf.controls.createElement("div","elf-popup-menus flex-box flex-direction-column");
        Elf.controls.appendTo(target.background,target.content);
        Elf.controls.appendTo(target.closer,target.content);
        Elf.controls.appendTo(target.menus,target.content);
        if(options.modle){
            target.mask=Elf.controls.createElement("div","elf-popup-mask");
            Elf.controls.appendTo(target.mask,target);
            Elf.xEvents.bind(target.mask,"click",function(evt){
                close(target);
            });
        }
        Elf.controls.appendTo(target.content,target);
        Elf.xEvents.bind(target.closer,"click",function(evt){
            close(target);
        });
        if(options.menus){
            Elf.utils.iterate(options.menus,function(key,fun){
                var menu=Elf.controls.createElement("button","elf-popup-menu",{innerHTML:key});
                if(options.menuClass){
                    Elf.utils.addClass(menu,options.menuClass);
                }
                Elf.controls.appendTo(menu,target.menus);
                Elf.xEvents.bind(menu,"click",function(evt){
                    close(target);
                    fun.call();
                });
            });
        }
        //Elf.controls.appendTo(target.body,target);
        if(options.target){
            Elf.controls.appendTo(target,options.target);
        }
    }
    function close(target){
        target.triggerElement.focus();
        Elf.utils.remove(target);        
    }
    Elf.utils.extend(Elf.components,{
        popup:function(options,params){
            if (typeof options == 'string'){
                return Elf.components.popup.methods[options](params);
            }
            var me=Elf.controls.createElement("div","elf-popup");
            options = Elf.utils.extend({
                width:"",
                height:"",
                modle:true,
                menus:{"确定":function(){}},
                menusClass:"",
                menuClass:"",
                closeClass:"",
                backgroundClass:"",
                target:document.body
            },Elf.components.popup.defaults,options);
            me.options=options;
            init(me,params);
            return me;
        }
    });
    Elf.components.popup.defaults={};
    Elf.components.popup.methods ={}
})(Elf);