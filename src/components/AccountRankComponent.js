

function AccountRankComponent(props)
{
    const account = props.account;

    return (
        <div className="flex flex-col">
            <img src={`data:image/${account.avatar_type};base64,${account.avatar}`} alt="avatar"/>
            <p>{account.username}</p>
            <p>{account.likes}</p>
        </div>
    );
}

export default AccountRankComponent;