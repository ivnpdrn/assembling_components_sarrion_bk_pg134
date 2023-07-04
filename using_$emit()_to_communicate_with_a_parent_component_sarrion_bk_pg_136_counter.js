
const Counter = {
    data()  {
        return {
            count : 0,
            old_value : 0
        }
    },

    template : `
        <input type="text" v-model="count"
        @keydown="verif($event)"
        @input="calcul()"
        @focus="focus()"
        @blur="blur()" />
   
    `,

    methods:  {
        verif(event) {
            if (event.key != "Backspace" && event.key != "Delete" && event.key != "ArrowLeft" && event.key != "ArrowRight" && event.key != "Tab") {

                // forbid the key if it is not numeric
                if (event.key < "0" || event.key > "9")
                event.preventDefault ();   // key forbidden
            }
            this.old_value = event.target.value;
        },
        calcul() {
            this.$emit("sub", this.old_value  || 0);    // substract
                                                        // old value
            this.$emit("add", this.count || 0);         // add new value
        },
        focus()  {
            if (this.old_value == "0")  this.count = "";
        },
        blur() {
            if (!parseInt(this.count)) {
                this.old_value = 0;
                this.count = 0;
            }
        }
    },
    emits : ["sub", "add"]  // declare events emitted to
                            // the parent

}

export default Counter;

// the "counter" component has been enriched with new methods, linked to new events to be taken into account during input.
// also, a new reactive variable, old_value, has been created:

// *the old_value variable contains the value that was entered in the field before pressing the key on the keyboard.

// *the count variable contains the value that was created in the field after pressing the key on the keyboard.

// why make this distintion?
// because to calculate the total of all the counters, it will be necessary, with each type key, to remove previous value from the field
// (before pressing the key) and add the new value (after pressing the key).

// Each keypress is handled by the input event, which here calls the calcul() method.
// As the calculation associated with the total of the three counters is performed at the higher level 
// (in the <counters> component, which is the parent component),
// you must indicate to this parent component the sum to substract (old_value) and the sum to add(count).
// This is done by sending "sub" and "add" events, using the $emit (eventName, value) method.

// ** About the $emit(eventName, value) Method
// The $emit (eventName, value) method, executed from a component, sends the eventName event to the parent component, which can process it 
//using the @eventName directive.
// The value parameter corresponds to the value to be transmitted if necessary.

// In addition, we indicate in the emits section of the components the list of events that this component can emit to its parent.

//* This way of communicating between a child component (here, the <counter> component) and its parent (here, the <counters> component), 
// using event, is the one recommended by Vue.js
