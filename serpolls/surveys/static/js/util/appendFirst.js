HTMLElement.prototype.appendFirst = function(childNode){
    if(this.firstChild)this.insertBefore(childNode,this.firstChild)
    else this.appendChild(childNode)
}
