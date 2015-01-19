var UI = function(camera) {
    this.keymap = {
        MOVE_FORWARD: 87,
        MOVE_LEFT: 65,
        MOVE_RIGHT: 68,
        MOVE_BACK: 83,
    };

    this.camera = camera;
};

UI.prototype = {
    constructor: UI,

    init: function() {
        var that = this;

        window.addEventListener('keydown', function(e) {
            that.update.call(that, e.which ? e.which : e.keyCode);
        }, false);
    },

    update: function(key) {
        switch (key) {
            case this.keymap.MOVE_FORWARD:
                this.camera.position.z -= 5;
                console.log('forward');
                break;
            case this.keymap.MOVE_LEFT:
                this.camera.rotation.y += 0.01;
                console.log('left');
                break;
            case this.keymap.MOVE_RIGHT:
                this.camera.rotation.y -= 0.01;
                console.log('right');
                break;
            case this.keymap.MOVE_BACK:
                this.camera.position.z += 5;
                console.log('back');
                break;
        }
    }
};
