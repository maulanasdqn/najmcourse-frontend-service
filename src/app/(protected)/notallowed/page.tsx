export const Component = () => {
  throw new Response("Forbidden", { status: 403 });
};

export default Component;
