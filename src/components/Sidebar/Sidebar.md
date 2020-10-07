```js
const Sidebar = require('./').default;
const {ETime, EPayRoll, Setting} = require('../Icons');
const {
  SidebarButton,
  SidebarMenu,
  SidebarTitle,
  SidebarMenuItem,
  SidebarLogo,
} = require('./');

<div className="sidebar-demo">
  <Sidebar
    isExpanded={true}
    classNames={{wrap: 'sidebar-demo-in'}}
    renderExpand={
      <div>
        <SidebarTitle>Settings</SidebarTitle>
        <SidebarMenu>
          <SidebarMenuItem
            active={true}
            sub={
              <SidebarMenu variant="sub">
                <SidebarMenuItem active={true}>Company</SidebarMenuItem>
                <SidebarMenuItem>Departments</SidebarMenuItem>
                <SidebarMenuItem>Gradings</SidebarMenuItem>
                <SidebarMenuItem>Branches</SidebarMenuItem>
                <SidebarMenuItem>WorkFlows</SidebarMenuItem>
              </SidebarMenu>
            }
          >
            General
          </SidebarMenuItem>
          <SidebarMenuItem sub={<div />}>eTime</SidebarMenuItem>
          <SidebarMenuItem sub={<div />}>ePayroll</SidebarMenuItem>
          <SidebarMenuItem>Users</SidebarMenuItem>
        </SidebarMenu>
      </div>
    }
  >
    <SidebarButton>
      <ETime />
    </SidebarButton>
    <SidebarButton>
      <EPayRoll />
    </SidebarButton>
    <SidebarButton active={true}>
      <Setting active={true} />
    </SidebarButton>
    <SidebarLogo
      src="https://scontent.fsgn2-4.fna.fbcdn.net/v/t31.0-8/13268309_1776320839250890_6336739617756356471_o.jpg?_nc_cat=101&_nc_oc=AQlsWpOIc3wxFfO8CtLYt4eMBdjh7agqxOzqJNrwFOICR841FqfZjGfDqN3pzO4Y1aI&_nc_ht=scontent.fsgn2-4.fna&oh=4ca766c851f17dfccd14eac63e1bf087&oe=5D1D2F06"
      alt="JuzTalent"
    />
  </Sidebar>
</div>;
```
