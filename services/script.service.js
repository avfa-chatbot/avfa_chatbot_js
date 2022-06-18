const { exec } = require("child_process");

module.exports = {
    reboot_py: async () => {
        const axios = require('axios');

        axios.get('http://localhost:5000/restart')
        .then(res => {
            console.log(`statusCode: ${res.status}`);
            console.log(res);
        })
        .catch(error => {
            console.error(error);
        });
    },
    run_py: async() => {
        exec("python3 python/app.py", (error, stdout, stderr) => {
            module.exports.run_train();
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
        });
    },
    run_train: async() => {
        exec("python3 python/train.py", (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            module.exports.reboot_py();
        });
    }
}