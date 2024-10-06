const bcrypt = require('bcrypt');

const pass1 = '123456';
const hash = '$2b$10$5fcR5mMFAFTEyJ5.A71eWOnLtajydKxe2JiZDz66GpkiRkikPyJpW';

async function start(){
    const hash = await bcrypt.hash(pass1,'$2b$10$5fcR5mMFAFTEyJ5.A71eWO');

   console.log(await bcrypt.compare(pass1,hash));
}

start();