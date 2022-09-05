let express = express
let router = express.Router()
let upload = require('../config/mult.config.js');

const csvWorker = require('../controllers.csv.')

let path = __basedir + '/views/';

router.get('/', (req, res)=>{
    console.log("__basedir" + __basedir)
    res.sendFile(path + 'index.html');
})

router.post('/api/file/upload', upload.single("file"), csvWorker.uploadFile)
router.post('/api/file/multiple/upload', upload.array('files', 4), csvWorker.uploadMultipleFiles);
router.get('/api/file', csvWorker.downloadFile);

mudule.exports = router;