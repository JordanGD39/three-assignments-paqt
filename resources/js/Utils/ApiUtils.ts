export namespace ApiUtils {
    export function fetchData(routeName: string, data?: any): Promise<Response> {       
        return fetch(route(routeName, data), {
            method: "GET",
        }).then((response) => response.json());
    }

    export const defaultCatch = (error: any) => console.log(error);
}