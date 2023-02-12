let str = "Samsung's new variant which goes beyond Galaxy to the Universe"

const format = str.split(" ").slice(0, 8).join(" ").concat("... ")
console.log(format);