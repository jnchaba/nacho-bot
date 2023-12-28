import { config } from "../config";

/** For 201 */
type UserCreated = { id: string; name: string };

/** For 400 */
type BadRequest = { code: "bad_request"; message: string };

/** Response type intersection */
type UserResponse =
  | (Omit<Response, "json"> & {
      status: 201;
      json: () => UserCreated | PromiseLike<UserCreated>;
    })
  | (Omit<Response, "json"> & {
      status: 400;
      json: () => BadRequest | PromiseLike<BadRequest>;
    });

/** Marshalling stream to object with narrowing */
const marshalResponse = (res: UserResponse) => {
  if (res.status === 201) return res.json();
  if (res.status === 400) return res.json();
  return Error("Unhandled response code");
};

/** Coerce Response to UserResponse */
const responseHandler = (response: Response) => {
  const res = response as UserResponse;
  return marshalResponse(res);
};


export function getAstroForecast(lat: number, long: number, end?: string): any {
	console.log('running getastroforecast')
	console.log('lat' + lat)	
	console.log('long' + long)	
	console.log('end' + end)	
	fetch(`https://api.stormglass.io/v2/astronomy/point?lat=${lat}&lng=${long}&end=${end}`, {
  		headers: {
			'Authorization': config.STORMGLASS_KEY
  		}
	}).then((res) => res.json()).then((jsonData => {
		console.log(jsonData);
		return jsonData;
	}));
}
