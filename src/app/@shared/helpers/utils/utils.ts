
class Utils {

    constructor() {}

    /**
     * check if a string represents a positive whole number (or zero)
     */
    isPositiveIntegerOrZero(str: string): boolean {
        const n = Math.floor(Number(str));
        return n !== Infinity && String(n) === str && n >= 0;
    }

    /**
     * filter a list of objects, include every object only once.
     *
     * object comparison is done by comparing the objects' <comparisonProperty> properties.
     * if their <comparisonProperty> properties are equal, the objects are assumed equal and thus included only once.
     */
    filterDuplicates(objs: any[], comparisonProperty: string): any[] {
        const filtered = [];

        const propertyValues = objs.map(obj => obj[comparisonProperty]);
        propertyValues.forEach((val, pos) => {
            if (propertyValues.indexOf(val) === pos)
                filtered.push(objs[pos]);
        });

        return filtered;
    }

    /**
     * convert an object into an array where each element corresponds to one of the properties from the original object <obj>.
     * returns an array of length 0 if <obj> is an empty object.
     */
    objectToArray(obj: { [key: string]: any }): any[] {
        if (!obj || obj === {})
            return [];

        return Object.keys(obj).map(k => obj[k]);
    }

    /**
     * convert an array of objects into an object where each property is an element in the original array <arr>.
     * the elements in the resulting object are indexed by their property named <indexPropertyName>.
     * returns an empty object if <arr> has length 0.
     * throws error if any object in <arr> doesn't contain property named <indexPropertyName>.
     */
    arrayToObject(arr: any[], indexPropertyName: string): { [key: string]: any } {
        const obj = {};

        if (!arr || arr.length === 0)
            return obj;

        arr.forEach(elem => {
            if (!(indexPropertyName in elem))
                throw new Error(`object does not contain property \'${indexPropertyName}\'`);

            const key = elem[indexPropertyName];
            obj[key] = elem;
        });

        return obj;
    }

    /**
     * convert an enum to an array of its values, or an array of its key names of enum is numeric
     *
     * examples:
     *
     *  enum ResourceName {
     *      USER            = 'user',
     *      USER_GROUP      = 'userGroup',
     *      PERMISSION      = 'permission'
     *  }
     *
     *  enum PermissionLevel {
     *      DENY = 1,
     *      REQUEST_AUTHENTICATION,
     *      ALLOW
     *  }
     *
     *  Utils.enumToArray(ResourceName)     =>  [ 'user', 'userGroup', 'role' ]
     *  Utils.enumToArray(PermissionLevel)  =>  [ 'DENY', 'REQUEST_AUTHENTICATION', 'ALLOW' ]
     */
    enumToArray(enumm: any): any[] {
        return Object.values(enumm)
            .filter(k => isNaN(Number(k)) );
    }

    /**
     * create a comma-separated label composed of elements in <list>
     */
    createListLabel(list: string[]): string {
        let label = '';
        list.forEach((item, pos) => {
          if (pos > 0)
            label += ', ';
          label += item;
        });
        return label;
    }

	/**
	 * check if a string represents a valid number
	 * may include decimal point and/or negative sign
	 */
    isNumeric(str: string): boolean {
        return !isNaN(Number(str));
    }

	/**
	 * check if an object is empty (equal to {})
	 */
	isEmptyObj(obj: any): boolean {
    	for (const key in obj) {
    		if (obj.hasOwnProperty(key))
    			return false;
		}
    	return true;
	}

	/**
	 * get the error signature portion of an error string as provided by the server.
	 *
	 * the server throws errors where the .error property consists of a single string with the following structure:
	 * "<error signature>: <error detail>"
	 *
	 * so this method extracts the portion of the string to the left of the first colon ':',
	 * or null if the provided string does not contain a colon.
	 *
	 * @param serverErrorString Server error string
	 * @return string|null The error signature (null if not found)
	 */
	getErrorSigFromServerErrorString(serverErrorString: string): string|null {
		const colonPosition = serverErrorString.indexOf(':');
		if (colonPosition === -1)
			return null;
		return serverErrorString.substr(0, colonPosition);
	}

	/**
	 * unsubscribe from all subscriptions in provided array of subscriptions,
	 * and remove them from that array after unsubscribing.
	 *
	 * @param subscriptions An array of subscriptions to unsubscribe from
	 */
	unsubscribeFromAll(subscriptions: any[]): void {
		// tslint:disable-next-line
		for (let i = 0; i < subscriptions.length;) {
			subscriptions[i].unsubscribe();
			subscriptions.splice(i, 1);
		}
	}

}

export default new Utils();
