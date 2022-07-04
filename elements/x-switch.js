import {YoffeeElement, createYoffeeElement, html} from "../libs/yoffee/yoffee.min.js";
import "./x-button.js"


customElements.define("x-switch", class extends YoffeeElement {
    constructor() {
        super({});

        if (window.IOS) {
            // this.onmouseup = () => this.dispatchEvent(new Event('click'));
            this.onmouseup = e => this.props.switched && this.props.switched(e);
        } else {
            this.onclick = e => this.props.switched && this.props.switched(e)
        }
    }

    render() {
        //language=HTML
        return html(this.props, this.state)`
            <style>
                :host {
                    display: flex;
                    align-items: center;
                    --circle-size: 25px;
                    --circle-margin: 3px;
                    --switch-on-background-color: rgba(0, 0, 0, 0.19);
                    --switch-off-background-color: rgba(0, 0, 0, 0.19);
                    height: calc(var(--circle-size) + var(--circle-margin) * 2 + 1px);
                }

                #text {
                    font-size: inherit;
                    margin-right: 15px;
                }

                #switch-container {
                    position: relative;
                    border-radius: 100px;
                    background-color: var(--switch-off-background-color);
                    padding: 0;
                    height: calc(var(--circle-size) + (var(--circle-margin) * 2));
                    width: calc((var(--circle-size) + (var(--circle-margin) * 2)) * 2);
                }

                #circle {
                    position: absolute;
                    background-color: #eeeeee;
                    border-radius: 100px;
                    transition: 0.3s;
                    top: var(--circle-margin);
                    left: var(--circle-margin);
                    width: var(--circle-size);
                    height: var(--circle-size);
                }

                #circle[is-on] {
                    margin-right: var(--circle-margin);
                    margin-left: auto;
                    left: calc(var(--circle-margin) * 3 + var(--circle-size));
                }

                #switch-container[is-on] {
                    background-color: var(--switch-on-background-color);
                }
            </style>

            <div id="text">
                <slot></slot>
            </div>
            <x-button id="switch-container" is-on="${() => this.props.value}">
                <div id="circle" is-on="${() => this.props.value}"></div>
            </x-button>
        `
    }
});