Ext.Loader.setPath({
    'Ext': 'ext/src',
  	'Deft': 'packages/deft/src/js',
    'Keer': 'app'
});
Ext.syncRequire([
	'Deft.promise.Deferred',    
	'Deft.mixin.Injectable',
    'Deft.mixin.Controllable',
    'Keer.ui.core.Widget.MainContainer',
    'Keer.ui.core.EntityModel.MainContainer',
    'Keer.ui.core.EntityEnum.MainContainer',
    'Keer.ui.core.MenuResource.MainContainer',
    'Keer.ui.core.Organization.MainContainer',
    'Keer.ui.core.Post.MainContainer',
    'Keer.ui.core.Role.MainContainer'
]);
Ext.application({

    name: 'Keer',

    extend: 'Keer.ui.core.Frame.Application',
    
    autoCreateViewport: false
});
