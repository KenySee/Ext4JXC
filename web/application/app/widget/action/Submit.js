Ext.define('Keer.widget.action.Submit',{
	extend: 'Ext.form.action.Submit',
	alias: 'formaction.filesubmit',
	doSubmit: function() {
        var me = this,
            ajaxOptions = Ext.apply(me.createCallback(), {
                url: me.getUrl(),
                method: me.getMethod(),
                headers: me.headers
            }),
            form = me.form,
            formInfo = null;

        if (form.hasUpload()) {
            formInfo = me.buildForm();
            ajaxOptions.form = formInfo.formEl;
            ajaxOptions.isUpload = true;
        }
        var record = form.getRecord();
        var model = Ext.ModelManager.getModel(record.modelName);
//      var json = model.requireJSON();
//      ajaxOptions['jsonData'] = Ext.Object.toQueryString({'bean':Ext.encode(data),'json':Ext.encode(json)});
        //增加bean表单域
        var data = record ? record.data : me.getParams(true);
        ajaxOptions['jsonData'] = Ext.Object.toQueryString({'bean':Ext.encode(data)});
        
        Ext.Ajax.request(ajaxOptions);
        if (formInfo) {
            me.cleanup(formInfo);
        }
    },
    buildForm: function() {
        var me = this,
            formSpec,
            formEl,
            basicForm = me.form,
            uploadFields = [],
            uploadEls = [],
            fields = basicForm.getFields().items,
            i,
            len   = fields.length,
            el;
        for (i = 0; i < len; ++i) {
            field = fields[i];
            if (field.rendered && field.isFileUpload()) {
                uploadFields.push(field);
            }
        }
        formSpec = {
            tag: 'form',
            action: me.getUrl(),
            method: me.getMethod(),
            target: me.target || '_self',
            style: 'display:none',
            cn: [] //不加载表单域
        };

        if (uploadFields.length) {
            formSpec.encoding = formSpec.enctype = 'multipart/form-data';
        }

        formEl = Ext.DomHelper.append(Ext.getBody(), formSpec);

        len = uploadFields.length;

        for (i = 0; i < len; ++i) {
            el = uploadFields[i].extractFileInput();
            formEl.appendChild(el);
            uploadEls.push(el);
        }
        return {
            formEl: formEl,
            uploadFields: uploadFields,
            uploadEls: uploadEls
        };
    }
});