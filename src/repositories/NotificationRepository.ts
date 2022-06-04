import NotificationResponse from "../models/responses/NotificationResponse";
import { urlAPI } from "./ConfigRepository";

export default class NotificationRepository {
    async getAllByUser(idUser: number) : Promise<Array<NotificationResponse>> {
        const data = {
            id_user: idUser,
        };

        const res = await fetch(`${urlAPI}/API-Sorveteria/routes/notification/get.php`, {
            method: 'POST',
            body: JSON.stringify(data)
        }).then(async (response) => {
            const json = await response.json();

            const notifications = Array<NotificationResponse>();
            for (let i = 0; i < json.length; i++) {
                const row = json[i];

                const notificationResponse = new NotificationResponse();
                notificationResponse.idNotification = row.id_notification;
                notificationResponse.date = row.date;
                notificationResponse.description = row.description;
                notificationResponse.type = row.id_notification_type;

                notifications.push(notificationResponse);
            }

            return notifications;
        }).catch(() => {
            const notifications = Array<NotificationResponse>();
            return notifications;
        });

        return res;
    }
}