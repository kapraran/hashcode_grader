Vue.use(VueMaterial.default);

Vue.component('output-uploader', {
    props: ['output'],
    template: '#output-uploader-tpl',
    data() {
        return {
            selectedFile: null,
            inputContents: null,
            score: 0,
            loading: false
        };
    },
    methods: {
        onFileChange(ev) {
            this.loading = true;
            this.score = 0;
            this.selectedFile = ev.target.files[0];

            var reader = new FileReader();

            reader.onload = (ev) => {
                var contents = ev.target.result;

                if (this.inputContents != null)
                    return this.calculateScore(this.inputContents, contents);

                this.requestInputContents().then((resp) => {
                    this.inputContents = resp.body;

                    this.calculateScore(this.inputContents, contents);
                });
            };

            reader.readAsText(this.selectedFile);
        },

        requestInputContents() {
            return this.$http.get('./input/' + this.output.fileName);
        },

        calculateScore(inputContents, outputContents) {
            var input = new Reader(inputContents);
            var output = new Reader(outputContents);

            this.score = calculateScore(input, output);

            if (this.score > this.output.bestScore) this.output.bestScore = this.score;

            this.loading = false;
        }
    }
});

Vue.component('output-best', {
    props: ['output'],
    template: '#output-best-tpl'
});

new Vue({
    el: '#app',
    data: {
        outputs: [
            {name: 'A - example', fileName: 'a_example.in', bestScore: 0},
            {name: 'B - should be easy', fileName: 'b_should_be_easy.in', bestScore: 0},
            {name: 'C - no hurry', fileName: 'c_no_hurry.in', bestScore: 0},
            {name: 'D - metropolis', fileName: 'd_metropolis.in', bestScore: 0},
            {name: 'E - high bonus', fileName: 'e_high_bonus.in', bestScore: 0}
        ]
    },
    computed: {
        totalBestScore() {
            sum = 0;
            for (var i = 0; i < this.outputs.length; i++)
                sum += this.outputs[i].bestScore;

            // return formatted
            return sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
    },
    methods: {
        clearBestScores() {
            for (var i = 0; i < this.outputs.length; i++)
                this.outputs[i].bestScore = 0;
        }
    }
});

function manhDist(a, b) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

function Point(x, y) {
    this.x = x;
    this.y = y;
}

function Ride(id, data) {
    this.id = id;
    this.startPos = new Point(data[0], data[1]);
    this.endPos = new Point(data[2], data[3]);
    this.startT = data[4];
    this.endT = data[5];
    this.distanceT = manhDist(this.startPos, this.endPos);
}

function Vehicle(id, B, T) {
    this.id = id;
    this.pos = new Point(0, 0);
    this.t = 0;
    this.bonus = B;
    this.maxT = T;

    this.execRide = (ride) => {
        var score = 0;
        this.moveTo(ride.startPos);

        if (this.t <= ride.startT) {
            score += this.bonus;
            this.t = ride.startT;
        }

        this.t += ride.distanceT;
        if (this.t <= ride.endT && this.t <= this.maxT) score += ride.distanceT;

        this.pos = ride.endPos;
        return score;
    };

    this.moveTo = (pos) => {
        var distance = manhDist(this.pos, pos);
        this.t += distance;
        this.pos = pos;
    };
}

function Reader(contents) {
    this.contents = contents;
    this.lines = contents.split('\n');
    this.index = 0;

    this.readLine = () => this.lines[this.index++];

    this.readArray = () => {
        tokens = this.readLine().split(' ');
        nums = [];

        for (var i in tokens) nums.push(parseInt(tokens[i]));

        return nums;
    };
}

function calculateScore(input, output) {
    var arr = input.readArray();
    var R = arr[0];
    var C = arr[1];
    var F = arr[2];
    var N = arr[3];
    var B = arr[4];
    var T = arr[5];

    var rides = [];
    for (var i = 0; i < N; i++) rides.push(new Ride(i, input.readArray()));

    var score = 0;
    var ridesCompleted = 0;

    for (var vid = 1; vid <= F; vid++) {
        var veh = new Vehicle(vid, B, T);

        var line = output.readArray();
        var vehRidesLen = line[0];
        var vehRides = line.slice(1);

        if (vehRides.length != vehRidesLen) throw 'length not equal';

        for (var i in vehRides) {
            var rid = vehRides[i];

            var rideScore = veh.execRide(rides[rid]);

            if (rideScore > 0) {
                ridesCompleted++;
                score += rideScore;
            }
        }
    }

    return score;
}
