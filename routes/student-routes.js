const router = require('express').Router();
const expressAsyncHandler = require("express-async-handler")
const Student = require('../models/student-model');
const College = require('../models/college-model');



router.get(
  '/collegeId/:id',
  expressAsyncHandler(async (req, res) => {
    const student = await Student.find({ collegeId: req.params.id })
    if (student) {
      res.send(student);
    } else {
      res.status(404).send({ message: 'student Not Found' });
    }
  })
);



router.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const student = await Student.findById(req.params.id)
    if (student) {
      res.send(student);
    } else {
      res.status(404).send({ message: 'student Not Found' });
    }
  })
);


router.get(
  '/storedata/seed',
  expressAsyncHandler(async (req, res) => {
    try {
      await Student.remove({});

      let college = [];
      let ids = [];
      let test = 1;
      let i;
      let j;
      ids = await College.find({}).select("_id");
      let final = [];
      ids.forEach(function (entry) {
        final.push(entry["_id"])
      });
      const year = ["2016", "2018", "2017", "2020", "2021", "2015", "2014"];
      const skills = ["CC", "CPP", "Java", "SQL", "React", "Web_D", "JS", "PHP", "View", "Ruby", "UI", "UX", "Pearl"]



      for (j = 0; j < 100; j++) {

        let clgid = final[j];
        for (i = 0; i < 100; i++) {
          const ranyear = Math.floor(Math.random() * year.length);
          const shuffled = skills.sort(() => 0.5 - Math.random());
          let selected = shuffled.slice(0, 4);
          const temp = {
            name: `student${test}`,
            yearOfBatch: year[ranyear],
            skills: selected,
            collegeId: clgid,
          };
          test++
          college.push(temp)
        }
      }

      // console.log("student", college)
      const createdProducts = await Student.insertMany(college);
      res.send({ createdProducts });
    } catch (err) {
      res.send(err.message);
    }



  })
);


router.get('/', (req, res) => {
  Student.find({}).then(blog => {
    if (blog) {
      res.send(blog)
    }
    else {
      return res.status(404).json("student not found");
    }
  })
})
module.exports = router;