var _ = require('lodash');

class Dictionary {
    words = {}
    beginning = {}
    end = {}
    push(word, beginning, end, wordafter) {
        console.log(this.words[word])
        if(this.words[word] != null || Object.keys(this.words).length != 0) {
            this.pushExisting(word, beginning, end, wordafter)
        } else {
            if(wordafter == null) {
                this.words = {
                    [word] : {
                        _beginning : beginning,
                        _end : end,
                        after : {
                        }
                }}
                if(beginning == 1) {
                    this.beginning = {
                        [word] : beginning
                    }
                }
                if(end == 1) {
                    this.end = {
                        [word] : end
                    }
                }
            } else {
                this.words = {
                    [word] : {
                        _beginning : beginning,
                        _end : end,
                        after : {
                            [wordafter] : 1
                        }
                }}
                if(beginning == 1) {
                    this.beginning = {
                        [word] : beginning
                    }
                }
            }
        }
    }

    pushExisting(word, beginning, end, wordafter) {
        if(wordafter == null) {
            var newobject = {
                [word] : {
                    _beginning : beginning,
                    _end : end,
                    after : {
                    }
            }}
            if(beginning == 1) {
                var newbeginning = {
                    [word] : beginning
                }
            }
            if(end == 1) {
                var newend = {
                    [word] : end
                }
            }
        } else {
            var newobject = {
                [word] : {
                    _beginning : beginning,
                    _end : end,
                    after : {
                        [wordafter] : 1
                    }
            }}
            if(beginning == 1) {
                var newbeginning = {
                    [word] : beginning
                }
            }
        }

        const customizer = (a, b) => _.defaultTo(_.add(a, b), undefined)

        const res = _.mergeWith({}, this.words, newobject, customizer)
        const beg = _.mergeWith({}, this.beginning, newbeginning, customizer)
        const ending = _.mergeWith({}, this.end, newend, customizer)

        this.words = res
        this.beginning = beg
        this.end = ending
    }

    parse(sentence) {
        sentence = sentence.toLowerCase()
        var sentences = sentence.split((/[.,]+/))
        //sentence = sentence.split(' ');
        for (var i in sentences) {
            sentence = sentences[i].split(/[ ]+/).filter(String)
            // sentence = sentences[i].split(' ').filter(String)
            for(var j in sentence) {
                if (j == 0) {
                    //Why is var i in array giving me a string for i???
                    this.push(sentence[j], 1, 0, sentence[Number(j) + 1])
                } else {
                    if(sentence.length == Number(j) + 1) {
                        this.push(sentence[j], 0, 1, null)
                        break;
                    }
                    this.push(sentence[j], 0, 0, sentence[Number(j) + 1])
                }
            }
        }
    }

    //eventually remove _beg and _end, still around for debugging
    toString() {
        console.log(this.words)
        console.log(this.beginning)
        console.log(this.end)
    }

    //returns highest value of after word given a word, use this on strings, returns string
    getHighestAfter(word) {
        var afterobj = this.words[word].after
        console.log(afterobj)
        if(Object.keys(afterobj).length == 0) {
            afterobj = null
        } else {
            afterobj = Object.keys(afterobj).reduce((a, b) => afterobj[a] > afterobj[b] ? a : b)
        }
        return afterobj
        
    }

    getProbabilities(word) {
        var probabilities = {}
        var afterobj = this.words[word].after
        var values = Object.values(afterobj)
        var total = _.sum(Object.values(afterobj))
        var words = Object.keys(afterobj)
        for(var i in words) {
            console.log(values[i])
            probabilities[words[i]] = values[i] / total
        }
        return probabilities
    }

    //returns highest key given an object, only use this on after object or probabilities object
    getHighestKeyFromVal(object) {
        var maxKey = _.maxBy(_.keys(object), function (o) { return object[o]; });
        return maxKey;
    }

    //Gets first word to seed the sentence from our beginning object
    getRandomSeedWord() {
        var size = _.keys(this.beginning).length
        //rand returns 0 - (dicsize-1)
        var rand = Math.floor(Math.random() * size);

        return Object.keys(this.beginning)[rand]
        //return this.beginning[Object.keys(rand)]
    }


    //include order eventually
    generate(length, seedword, order) {
        var sentence = []
        if(seedword == null) {
            var seedword = this.getRandomSeedWord()
        }
        sentence.push(seedword)
        while (sentence.length != length) {
            seedword = this.getHighestAfter(seedword)
            if(seedword == null) {
                break;
            }
            sentence.push(seedword)
        }
        return sentence
    }
}
module.exports = {
    Dictionary: Dictionary
}
