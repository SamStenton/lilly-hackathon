<template>
	<div class="container">
	  Level {{level}}
	  <p>Left to Find: {{toFind}}</p>
	<div class="modal" v-bind:class="{ modalActive: modalActive }">
		<div class="modal-background"></div>
		<div class="modal-content">
			<div class="modal-section" v-if="completed">
				<h2 class="title">Go to next level</h2>
				<p>Contine clicking the squares.</p>
				<button class="button is-success is-outlined is-large" @click="getNewSet()">Next</button>
			</div>
			<div class="modal-section" v-if="failed">
				<h2 class="title">That was inccorect</h2>
				<p>Your final level: {{ level }}.</p>
				<button class="button is-warning is-outlined is-large" @click="getNewSet(true)" v-show="failed">Go Again</button>
			</div>
		 
		  <div class="modal-section">
		  	<h2 class="title">Begin</h2>
		  	<p>Click the squares that flash</p>
		  	<button class="button is-success is-outlined is-large" @click="start()">Start</button>	
		  </div>
		</div>
		<!-- <button class="modal-close"></button> -->
	</div>
	
	  <div class="innerContainer">
	      <div class="row" v-for="r in rows">
	        <div class="square" @click="clicked(r,s)" v-for="s in squaresInRow"></div>
	      </div>
	  </div>
	</div>
</template>
<script>
export default {
	name: 'remember',
	data() {
		return {
			rows: 4,
			squaresInRow: 4,
			squaresToFind: [],
			level: 0,
			squares: [],
			failed: false
		}
	},
	 mounted() {
		
	 },
	methods: {
		start() {
			event.target.parentNode.classList.add("hidden")
			this.modalActive = false;
			this.getNewSet();
		},
		clicked(row, square) {
			if (!this.failed) {
		  		var num = ((row-1)*this.rows)+(square);
				if(this.squaresToFind.includes(num)) {
		      		event.target.classList.add('correct')
		        	this.squares.push(num)
		      	} else {
		      		this.failedLevel()
		     	}
			} else {
				this.failedLevel()
			}
	    },
		flashSquares() {
			this.squaresToFind.forEach(function(index){
				var el = document.getElementsByClassName("square")[index-1];
				//Trigger element re-flow
				void el.offsetWidth;
				el.classList.add('flash');
			});
		},
	    getNewSet(failed = false) {
	        this.clearBoard();
	        if (!failed) {this.level++;}
	        this.$http.get(`/remember-tile/level/${this.level}`).then((response) => {
	          this.squaresToFind = response.data;
	            this.failed = false;
	          	this.flashSquares();
	        }, (response) => {
	          console.log("Go Error: ", response.data)
	        });

	    },
	    failedLevel() {
	    	var list = document.getElementsByClassName("square");
	    	for (var i = 0; i < list.length; i++) {
	    		list[i].classList.add('failed');
	    	}
	    	this.failed = true;
	    	this.modalActive = true;
	    },
	    clearBoard()  {
			var list = document.getElementsByClassName("square");
			[].forEach.call(list, function(el) {
				el.classList.remove('correct', 'flash', 'failed')
			});
	    	this.squares = [];
	    }
	  },
	  computed: {
		toFind: function() {
    		return this.squaresToFind.length - this.squares.length
	    },
	    completed: function() {
	    	return this.toFind == 0 && this.level > 0;
	    },
	    modalActive: function() {
	    	return this.completed || this.failed || this.level == 0;
	    }
	  }
	}
</script>
<style>
	.container {
	  background: lightblue;
	  width: 100%;
	  height: 100%;
	}

	.innerContainer {
	  width: 400px;
	  height: 400px;
	  flex-wrap: wrap;
	  display: flex;
	  margin: auto;
	}

	.row {
	  width: 100%;
	  display: flex;
	  justify-content: center;
	}
	.square {
	  background: white;
	  width: 22.5%;
	  height: 90%;
	  margin: auto;
	}

	.correct {
	  background: green!important;
	}

	.flash {
	  //background: pink;
	  -webkit-animation-name: flash;
	  -webkit-animation-duration: 900ms;
	  -webkit-animation-iteration-count: 1;
	  -webkit-animation-timing-function: ease-in-out;
	}

	@-webkit-keyframes flash {
	    0% {
	        background-color: white;
	        opacity:1;
	    }
	    50% {
	        background-color: green;
	    }
	    100% {
	        background-color: white;
	    }
	}

	.failed {
	  -webkit-animation-name: failed-flash;
	  -webkit-animation-duration: 900ms;
	  -webkit-animation-iteration-count: 1;
	  -webkit-animation-timing-function: ease-in-out;
	}

	@-webkit-keyframes failed-flash {
	    0% {
	        background-color: white;
	        opacity:1;
	    }
	    50% {
	        background-color: red;
	    }
	    100% {
	        background-color: white;
	    }
	}
	.modalActive {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
	}

	.modal-content {
		background: rgba(255,255,255,255.5);
		height: 250px;
	}
	.modal-section {
		text-align: center;
		padding: 50px;
	}

	.modal-section button {
		margin-top: 20px;
	}
</style>