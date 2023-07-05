
import Counter from "./counter.js";
const Counters = {
    data ()  {
        return {
            total : 0
        }
    },

    components : {
        Counter:Counter
    },

    props : ["nb"],
    computed : {
        NB () {
            var tab = [];
            for ( var i = 0; i < this.nb; i++) tab.push(i+1);
            return tab; 
        }
    },

    template : `
        <div v-for="i in NB">
            Counter {{i}} : <counter @add="add($event)"
            @sub="sub($event)" />
        </div>

        <br>
        Total : {{total}} <br>
    `,

    methods :  {
        add(value) {
            this.total += parseInt(value);
        },

        sub(value) {
            this.total -= parseInt(value);
        }
    },
}

export default Counters;

// the _add_ and _sub_ events emitted in the _counter_ child component are processed in the attributes of the _counter_ component when used.

// The add(value) and sub (value) processing methods are registred in the parent component, which allows the value of the total to be changed

// each time a numeric key is pressed on the keyboard.