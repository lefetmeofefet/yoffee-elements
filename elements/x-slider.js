import {html, createYoffeeElement, YoffeeElement} from "../libs/yoffee/yoffee.min.js"
import "./x-button.js"


createYoffeeElement("x-slider", class extends YoffeeElement {
    constructor() {
        super({
            isSliding: false
        });

        window.addEventListener('mouseup', (event) => {
            if (this.isSliding) {
                this.isSliding = false;
                this.props.released && this.props.released(this.value)
            }
        })
        window.addEventListener('mousemove', (event) => {
            if (this.isSliding) {
                event.preventDefault();
                requestAnimationFrame(() => this.updateCircleLocation(event))
            }
        })

        this.addEventListener("mousedown", event => {
            this.isSliding = true
            this.startX = 0
            this.updateCircleLocation(event)
        })
    }

    updateCircleLocation(event) {
        let container = this.getBoundingClientRect()

        let newX = event.pageX - this.startX - container.x
        if (newX < 0) {
            newX = 0
        } else if (newX > container.width) {
            newX = container.width
        }
        this.circle.style.left = newX + "px"
        this.value = newX / container.width

        this.props.updated && this.props.updated(this.value)
    }

    connectedCallback() {
        this.circle = this.shadowRoot.querySelector("#circle")
    }

    render() {
        //language=HTML
        return html(this.props, this.state)`
            <style>
                :host {
                    position: relative;
                    display: flex;
                    align-items: center;
                    --circle-size: 25px;
                    --line-height: 2px;
                    --line-color: #999999;
                    --circle-color: #88aadd;
                    height: calc(var(--circle-size) + 6px);
                    width: -webkit-fill-available;
                }

                #circle {
                    position: absolute;
                    background-color: var(--circle-color);
                    border-radius: 100px;
                    padding: 0;
                    /*top: var(--circle-margin);*/
                    /*left: var(--circle-margin);*/
                    width: var(--circle-size);
                    height: var(--circle-size);
                    margin-left: calc(var(--circle-size) * -0.5);
                    transition: 0s;
                }

                #line {
                    width: 100%;
                    height: var(--line-height);
                    background-color: var(--line-color);
                    left: var(--circle-size);
                }

            </style>

            <x-button id="circle"
                      onmousedown=${e => {
                          this.isSliding = true
                          this.startX = e.offsetX - 12.5
                          e.stopPropagation()
                          e.preventDefault();
                      }}
            ></x-button>
            <div id="line"></div>
        `
    }
});