export default class TestRepository {
    async testServer(ip: string) : Promise<boolean> {

        const res = await fetch(`${ip}/routes/test.php`, {
            method: 'GET',
        }).then(async (response) => {
            const json = await response.json();

            return json;
        }).catch(() => {
            return false;
        });
        return res;
    }
}