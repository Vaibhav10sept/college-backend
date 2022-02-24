const router = require('express').Router();
const College = require('../models/college-model');
const expressAsyncHandler = require("express-async-handler")



router.get(
    '/similarCollege/:id',
    expressAsyncHandler(async (req, res) => {
        const id = req.params.id
        const col = await College.findById(req.params.id)
        if (col) {
            const state = col.state
            const course = col.courses
            const result =  await College.find({$and:[{courses:{$in:course}},{state:state}]})
            res.send(result)
        } else {
            res.status(404).send({ message: 'college Not Found' });
        }
    })
);



router.get(
    '/countCourses',
    expressAsyncHandler(async (req, res) => {
        const course = ["IT", "CSE", "ML", "M-TECH", "PHD", "HM", "BSC"];

        let final = [];
        let i ;
        for(i=0;i<course.length;i++) {
            let res = await College.find({ courses: { $in: course[i] } }).count()
            if (res) {
                let temp = {
                    name: course[i],
                    value: res
                }
                final.push(temp)
            } else {
                res.status(404).send({ message: ' Not Found' });
            }
         
        }
   res.send(final)
    })
);



router.get(
    '/countStates',
    expressAsyncHandler(async (req, res) => {
        const state = ["uttar pradesh", "haryana", "madhya pradesh", "maharashtra", "andhra pradesh", "assam", "jharkhand"]
        let final = [];
        let i ;
        for(i=0;i<state.length;i++) {
            let res = await College.find({ state: state[i] }).count()
            if (res) {
                let temp = {
                    name: state[i],
                    value: res
                }
                final.push(temp)
            } else {
                res.status(404).send({ message: ' Not Found' });
            }
         
        }
   res.send(final)
    })
);


router.get(
    '/state/:state',
    expressAsyncHandler(async (req, res) => {
        const col = await College.find({ state: req.params.state })
        if (col) {
            res.send(col);
        } else {
            res.status(404).send({ message: ' Not Found' });
        }
    })
);

router.get(
    '/course/:course',
    expressAsyncHandler(async (req, res) => {
        const para = req.params.course
        const col = await College.find({ courses: { $in: para } })
        if (col) {
            res.send(col);
        } else {
            res.status(404).send({ message: ' Not Found' });
        }
    })
);


router.get(
    '/:id',
    expressAsyncHandler(async (req, res) => {
        const col = await College.findById(req.params.id)
        if (col) {
            res.send(col);
        } else {
            res.status(404).send({ message: 'college Not Found' });
        }
    })
);

router.get(
    '/storedata/seed',
    expressAsyncHandler(async (req, res) => {
        try {
    await College.remove({});

            let college = [];
            let test = 1;
            let i;
            const years = ["1998", "2000", "2010", "1995", "2002", "2005", "2009","2008","2003","2004","2018","1999",];
            const city = ["city1", "city2", "city3", "city4", "city5", "city6", "city7","city8","city9","city10","city11"]
            const state = ["uttar pradesh", "haryana", "madhya pradesh", "maharashtra", "andhra pradesh", "assam", "jharkhand"]
            const course = ["IT", "CSE", "ML", "M-TECH", "PHD", "HM", "BSC","BCOM","MCOM","BA","MA","MSC"];

            for (i = 0; i < 100; i++) {
                const ranyears = Math.floor(Math.random() * years.length);
                const rancity = Math.floor(Math.random() * city.length);
                const ranstate = Math.floor(Math.random() * state.length);

                const shuffled = course.sort(() => 0.5 - Math.random());


                let selected = shuffled.slice(0, 4);
                const temp = {
                    name: `college${test}`,
                    yearFounded: years[ranyears],
                    city: city[rancity],
                    state: state[ranstate],
                    country: "india",
                    courses: selected,

                };
                test++
                college.push(temp)
            }

            console.log("products", college)
            const createdProducts = await College.insertMany(college);
            res.send({ createdProducts });
        } catch (err) {
            res.send(err.message);
        }
    })
);

router.get('/', (req, res) => {
    College.find({}).then(blog => {
        if (blog) {
            res.send(blog)
        }
        else {
            return res.status(404).json("Blog not found");
        }
    })
})
module.exports = router;