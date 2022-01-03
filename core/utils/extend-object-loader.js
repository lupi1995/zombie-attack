import { ObjectLoader, LoaderUtils, FileLoader } from "three";
ObjectLoader.prototype.load = function (url, onLoad, onProgress, onError) {

    const scope = this;

    const path = (this.path === '') ? LoaderUtils.extractUrlBase(url) : this.path;
    this.resourcePath = this.resourcePath || path;

    const loader = new FileLoader(this.manager);
    loader.setPath(this.path);
    loader.setRequestHeader(this.requestHeader);
    loader.setWithCredentials(this.withCredentials);
    loader.load(url, function (text) {

        let json = null;

        try {

            json = JSON.parse(text);

        } catch (error) {

            if (onError !== undefined) onError(error);

            console.error('THREE:ObjectLoader: Can\'t parse ' + url + '.', error.message);

            return;

        }
        if (!json.meta) {
            const metadata = json.metadata;

            if (metadata === undefined || metadata.type === undefined || metadata.type.toLowerCase() === 'geometry') {

                console.error('THREE.ObjectLoader: Can\'t load ' + url);
                return;

            }
            scope.parse(json, onLoad);
        }else{
            onLoad(json);
        }


    }, onProgress, onError);

}
export default ObjectLoader;