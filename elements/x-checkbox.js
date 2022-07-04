import {YoffeeElement, createYoffeeElement, html} from "../libs/yoffee/yoffee.min.js";
import "./x-button.js"
import "./x-icon.js"


customElements.define("x-checkbox", class extends YoffeeElement {
    constructor() {
        super({});

        if (window.IOS) {
            // this.onmouseup = () => this.dispatchEvent(new Event('click'));
            this.onmouseup = e => this.props.selected && this.props.selected(e);
        } else {
            this.onclick = e => this.props.selected && this.props.selected(e);
        }
    }

    render() {
        //language=HTML
        return html(this.props, this.state)`
                <style>
                    :host {
                        --checkbox-border-color: gray;
                        --checkbox-fill-color: gray;
                        --checkbox-check-color: white;
                        display: flex;
                        align-items: center;
                        border-radius: 3px;
                        width: 26px;
                    }
                    
                    x-button {
                        background-color: #00000000;
                        box-shadow: none;
                        padding: 3px;
                        border: 2px solid var(--checkbox-border-color);
                        border-radius: inherit;
                        width: inherit;
                    }
                    
                    x-button[is-on] {
                        background-color: var(--checkbox-fill-color);
                    }
                    
                    #check {
                        display: flex;
                        visibility: hidden;
                        color: var(--checkbox-check-color);  
                    }
                    
                    x-button[is-on]>#check {
                        visibility: visible;
                    }
                    
                </style>
                <x-button is-on="${() => this.props.value}">
                    <x-icon id="check" icon="fas fa-check"></x-icon>
                </x-button>
        `
    }
});