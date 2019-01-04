const LSFR = require('./lsfr')

class App{
    static run(){
        const deg1 = 22
        const deg2 = 21

        let z1 = LSFR.generateImpulsSequence(deg1)


        console.log(z1.join(''))

        let s1 = LSFR.generateLSFR1(2 ** deg1 - 1,deg1).map((item) => +item)
        console.log(s1.join(''))

        let period1 = LSFR.getPeriod(s1,z1)

        console.log(period1)

        LSFR.getPolynomInfo(period1, 2 ** deg1 - 1)


        let q1 = LSFR.generateLSFR1(period1 - 1,deg1).map((item) => +item)

        LSFR.autoCorrelation(q1)


        for(let i = 1; i < 3; i++){
            console.log(LSFR.calculateKGramFrequency(q1,i))
        }

        console.log('-----')

        let z2 = LSFR.generateImpulsSequence(deg2)
        console.log(z2.join(''))

        let s2 = LSFR.generateLSFR2(2 ** deg2 - 1,deg2).map((item) => +item)

        let period2 = LSFR.getPeriod(s2,z2)

        console.log(period2)

        LSFR.getPolynomInfo(period2, 2 ** deg2 - 1)

        let q2 = LSFR.generateLSFR1(period2 - 1,deg2).map((item) => +item)
        LSFR.autoCorrelation(q2)

        for(let i = 1; i < 3; i++){
            console.log(LSFR.calculateKGramFrequency(q2,i))
        }

    }
}


App.run()