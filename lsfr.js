const fs = require('fs')

const generateImpulsSequence = polynomPow => (1 << polynomPow - 1).toString(2).split('').reverse()

const generateLSFR1 = (iterations,n) => {
    var rs = generateImpulsSequence(n)

    for(let i = 0; i < iterations; i++){
        rs.push(
            rs[i+17] ^ rs[i + 15] ^ rs[i + 14] ^ rs[i + 13] ^ rs[i + 11] ^ rs[i + 8] ^ rs[i + 7] ^ rs[i + 6] ^ rs[i + 3] ^ rs[i + 2] ^ rs[i + 1] ^ rs[i]
        )
    }

    return rs
}

const generateLSFR2 = (iterations,n) => {
    var rs = generateImpulsSequence(n)

    for(let i = 0; i < iterations; i++){
         
        rs.push(
            rs[i+16] ^ rs[i + 15] ^ rs[i + 14] ^ rs[i + 13] ^ rs[i + 10] ^ rs[i + 9] ^ rs[i + 7] ^ rs[i + 2] ^ rs[i + 1] ^ rs[i]
        )
    }

    return rs
}
const getPolynomInfo = (period,maxPeriod) => {
    if(period === maxPeriod){
        console.log("Примітивний, з чого слідує що він незвідний")
    }
    else if(maxPeriod % period == 0){
        console.log("Непримітивний, можливо незвідний, бо період ділить максимальний період")
    }
    else{
        console.log("Непримітивний, звідний")
    }
}


const getPeriod = (sequence,state) => {
    let period = 1, n = state.length

    for(let i = 1; i < sequence.length; i++){
        if(sequence.slice(i,i + n).join('') == state.join('')){
            return period
        }
        else{
            period++
        }
    }
    return period
}


const autoCorrelation = (sequence, period = 10) => {
    let autoCorrelation = {}

    for(let d = 0; d < period + 1; d++){
        let shifted = Array.prototype.concat(
            sequence.slice(sequence.length - d),sequence.slice(0,sequence.length - d)
        )
       
        autoCorrelation[d] = 0
        for(let i = 0; i < sequence.length; i++){
            if(sequence[i] != shifted[i]){
                autoCorrelation[d] += 1
            }
        }
    }

    for(let item in autoCorrelation){
       console.log(`d = ${item}: ${autoCorrelation[item]}`)
    }
}


const calculateKGramFrequency = (sequence,step) => {
   
    let y = {};
    let count = 0
    for(let i = 0; i < sequence.length - 1; i += step){
        if(y[sequence.slice(i,i + step).join('')]){
            continue
        }
        else{
            y[sequence.slice(i,i + step).join('')] = 0
            count++;
        }
    }
    for(let i = 0; i < sequence.length - 1; i += step){
        let curKGram = sequence.slice(i,i + step).join('')
        y[curKGram] += 1 
    }
    for(let i in y){
        y[i] = y[i] / count
    }

    return y
}







module.exports = {
    autoCorrelation: autoCorrelation,
    calculateKGramFrequency: calculateKGramFrequency,
    getPeriod: getPeriod,
    generateImpulsSequence: generateImpulsSequence,
    generateLSFR1: generateLSFR1,
    generateLSFR2: generateLSFR2,
    getPolynomInfo: getPolynomInfo,

}