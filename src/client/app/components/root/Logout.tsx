import React from "react";
import {PageComponent, PageComponentProps, PageComponentState} from "../PageComponent";
import {IUser} from "../../cmn/models/User";
import {NotificationPlugin} from "../../plugin/NotificationPlugin";

export interface LogoutParams {
}

export interface LogoutProps extends PageComponentProps<LogoutParams> {
}

export interface LogoutState extends PageComponentState {
}

export class Logout extends PageComponent<LogoutProps, LogoutState> {

    public componentDidMount() {
        if (this.auth.isGuest()) {
            return this.props.history.push('/');
        }
        NotificationPlugin.getInstance().logoutToken();
        this.api.get<IUser>('account/logout')
            .then(response => {
                this.auth.logout();
                this.auth.login(response.items[0]);
                this.props.history.push('/login');
            })
            .catch(err => {
                this.auth.logout();
                this.props.history.push('/login');
                this.notif.error(this.tr(err.message));
            });
    }

    public render() {
        return null;
    }
}
