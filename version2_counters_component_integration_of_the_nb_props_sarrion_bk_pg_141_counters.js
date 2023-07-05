
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

// * the "nb" props are listed in the component's props section. To display a list of counters, use the v-form directive on a <div> element.

// * How to Use the v-for Directive
// For the value of the v-form directive, you must specify an array to browse. To do this, we transform the value of the "nb" props into an array
// [1, 2, 3, ..., nb]. This is done using a computed property named NB, which returns the desired array.