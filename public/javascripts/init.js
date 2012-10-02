$(document).ready(function ($http) {
    new SplitViewNavigator('body', "Menu");

    window.splitViewNavigator.pushSidebarView({
        title: "",
        backLabel: null,
        view: '',
    });
    $http.get('/landing').success(function(data) {
        pushBody({
            title: 'Outdoors Hawaii', 
            backLabel: null,
            view: data, 
        });
    });
});

function pushBody(view) {
    window.splitViewNavigator.pushBodyView(view);
}
