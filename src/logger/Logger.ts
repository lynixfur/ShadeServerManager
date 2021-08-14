import colors from 'colors';

export async function Logger(message: string, type: number) {
    var d = new Date();

    var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
    d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);

    switch (type) {
        case 1:
            console.log("[" + colors.gray(datestring) + "] " +
                        colors.cyan("INFO: ") + message);
            break;
        case 2:
            console.log("[" + colors.gray(datestring) + "] " +
                        colors.green("SUCCESS: ") + message);
            break;
        case 3:
            console.log(colors.gray(datestring));
            break;
        case 4:
            console.log(colors.gray(datestring));
            break;
    }
}