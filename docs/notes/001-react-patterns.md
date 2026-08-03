# Pattern 001 - Components are values

Today I learned something that completely changed how I think about React.

I always thought components were special.

But they are actually just JavaScript values.

Example:

const Icon = MapPinned;

<Icon />

is exactly the same as

<MapPinned />

This means I can store components inside objects or arrays.

Example:

const icons = {
    centre: MapPinned,
    users: Users,
};

const Icon = icons[item.icon];

<Icon size={16} />

---

Why use it?

Instead of

if centre -> MapPinned

if users -> Users

I let the data decide which component to render.

This keeps JSX clean.

Key idea:

React components are just values that can be passed around like variables.

Where will I see this again?

- Sidebar navigation
- Tables
- Dashboards
- Menus
- Status badges