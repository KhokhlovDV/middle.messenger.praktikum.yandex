import { Block, BlockProps, connect } from '../../framework';
import { Router } from '../../router';
import { RoundedButton } from '../../shared-components';
import { AppStoreType, UserData } from '../../store/Store';
import { AvatarPicker } from './components/avatar-picker';
import { SettingsForm } from './components/settings-form';

interface Props extends BlockProps, Pick<UserData, 'avatar' | 'first_name'> {}

class Settigs extends Block {
    private avatar: AvatarPicker;

    constructor(props: Props) {
        const avatar = new AvatarPicker({
            src: props.avatar ?? '',
            className: 'settings__avatar',
        });
        super({
            ...props,
            BackButton: new RoundedButton({
                src: '/left_arrow.svg',
                onClick() {
                    Router.getInstance().back();
                },
            }),
            AvatarPicker: avatar,
            first_name: props.first_name,
            Form: new SettingsForm({
                isInEditMode: false,
            }),
        });
        this.avatar = avatar;
    }

    protected override componentDidUpdate = (
        oldProps: Props,
        newProps: Props
    ) => {
        if (oldProps.avatar !== newProps.avatar) {
            this.avatar.setProps({
                src: newProps.avatar,
            });
        }
        return true;
    };

    render() {
        return `<div class="settings">
                    <nav class="settings__nav">
                        {{{BackButton}}}
                    </nav>
                    <main class="settings__content">
                        {{{AvatarPicker}}}
                        <h3 class="settings__first-name">{{first_name}}</h3>
                        {{{Form}}}
                    </main>
                </div>`;
    }
}

export const SettigsPage = connect<AppStoreType>((state) =>
    state.user
        ? {
              avatar: state.user.avatar,
              first_name: state.user.first_name,
          }
        : {}
)(Settigs);
