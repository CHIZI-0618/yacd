import{r as c,R as s,P as a}from"./index-9f06cd93.js";function l(){return l=Object.assign||function(t){for(var o=1;o<arguments.length;o++){var r=arguments[o];for(var e in r)Object.prototype.hasOwnProperty.call(r,e)&&(t[e]=r[e])}return t},l.apply(this,arguments)}function u(t,o){if(t==null)return{};var r=g(t,o),e,n;if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);for(n=0;n<i.length;n++)e=i[n],!(o.indexOf(e)>=0)&&Object.prototype.propertyIsEnumerable.call(t,e)&&(r[e]=t[e])}return r}function g(t,o){if(t==null)return{};var r={},e=Object.keys(t),n,i;for(i=0;i<e.length;i++)n=e[i],!(o.indexOf(n)>=0)&&(r[n]=t[n]);return r}var p=c.forwardRef(function(t,o){var r=t.color,e=r===void 0?"currentColor":r,n=t.size,i=n===void 0?24:n,f=u(t,["color","size"]);return s.createElement("svg",l({ref:o,xmlns:"http://www.w3.org/2000/svg",width:i,height:i,viewBox:"0 0 24 24",fill:"none",stroke:e,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},f),s.createElement("polyline",{points:"23 4 23 10 17 10"}),s.createElement("path",{d:"M20.49 15a9 9 0 1 1-2.12-9.36L23 10"}))});p.propTypes={color:a.string,size:a.oneOfType([a.string,a.number])};p.displayName="RotateCw";const y=p;export{y as R};
