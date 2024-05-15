import { Component } from '@angular/core';
import { CometChat } from '@cometchat/chat-sdk-ionic';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

    constructor() {
    }

    cometChatInit = (): void => {
        const appID = 'COMETCHAT_APP_ID';
        const region = 'COMETCHAT_REGION';
        const appSetting: CometChat.AppSettings = new CometChat.AppSettingsBuilder()
            .subscribePresenceForAllUsers()
            .setRegion(region)
            // .autoEstablishSocketConnection(true)
            .build();
        CometChat.init(appID, appSetting).then(
            (initialized: boolean) => {
                console.log('initialized', initialized);

                setTimeout(() => {
                    this.getLoggedinCometChatUser();
                }, 1000);
            }, (error: CometChat.CometChatException) => {
                console.log("Initialization failed with error:", error);
            }
        );
    }

    // get Logged in CometChat User if not then login
    getLoggedinCometChatUser() {
        console.log('getLoggedinCometChatUser');

        const authKey = 'COMETCHAT_AUTH_KEY';
        CometChat.getLoggedinUser().then(
            (user: CometChat.User | null) => {
                console.log('user', user);

                if (!user) {
                    CometChat.login('COMETCHAT_ID_FROM_BE', authKey).then(
                        (user: CometChat.User) => {
                            console.log("Login Successful:", { user });
                        }, (error: CometChat.CometChatException) => {
                            console.log("Login failed with exception:", { error });
                        }
                    );
                }
            }, (error: CometChat.CometChatException) => {
                console.log("Some Error Occured", { error });
            }
        );
    }

}
