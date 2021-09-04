class Header {
    get avatarName(): string {
        const avatarNameNode = $('header .avatar-name');
        return avatarNameNode.getText();
    }
}

export default new Header();
