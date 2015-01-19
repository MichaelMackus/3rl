var Game = function() {
    this.settings = {
        width: window.innerWidth,
        height: window.innerHeight,
        viewAngle: 45,
        aspect: window.innerWidth / window.innerHeight,
        near: 0.1,
        far: 10000
    };

    this.mobs = [];

    this.gameOver = false;
	this.timeStep = 0.01666;
    this.accumulator = 0;
    this.currentTime = Date.now();
};

Game.prototype = {
    constructor: Game,

    // initialize our scene with some mobs
    init: function () {
        this.renderer = new THREE.WebGLRenderer();
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            this.settings.viewAngle,
            this.settings.aspect,
            this.settings.near,
            this.settings.far
        );

        this.camera.position.z = 300;
        this.renderer.setSize(this.settings.width, this.settings.height);

        document.getElementsByTagName('body')[0].appendChild(
            this.renderer.domElement
        );

        this.initLight();
        this.initMobs();
        this.initUI();

        this.loop();
    },

    update: function() {
        for (var i = 0, len = this.mobs.length; i < len; i++) {
            var mob = this.mobs[i];
            mob.rotation.x += 1;
            mob.rotation.y += 1;
        }
    },

    // game loop
    loop: function() {
        var that = this;

		var newTime = Date.now();
		var frameTime = (newTime - this.currentTime) / 1000;
		if (frameTime > 0.33) {
			frameTime = 0.33;
		}
		this.currentTime = newTime;
		this.accumulator += frameTime;

		while (this.accumulator >= this.timeStep) {
            this.update();
            this.accumulator -= this.timeStep;
		}

        this.render();

		requestAnimationFrame(function() { that.loop(); });
    },

    // some simple lighting
    initLight: function() {
        var pointLight = new THREE.PointLight(0xFFFFFF);
        pointLight.position.x = 10;
        pointLight.position.y = 50;
        pointLight.position.z = 130;

        this.scene.add(pointLight);
    },

    // just a simple sphere for now
    initMobs: function() {
        var radius = 50, segments = 16, rings = 16;

        var sphereMaterial = new THREE.MeshLambertMaterial({
            color: 0xCC0000
        });

        var sphere = new THREE.Mesh(
            new THREE.SphereGeometry(
                radius,
                segments,
                rings
            ),
            sphereMaterial
        );

        this.mobs.push(sphere);
        this.scene.add(sphere);
    },

    initUI: function() {
        this.ui = new UI(this.camera);
        this.ui.init();
    },

    render: function() {
        this.renderer.render(this.scene, this.camera);
    }
};

window.addEventListener('load', function() {
    (new Game()).init();
}, false);
