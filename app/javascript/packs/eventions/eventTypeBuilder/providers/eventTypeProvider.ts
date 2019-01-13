import Provider from "../../common/providers/provider";

export default class EventTypeProvider extends Provider {
  update(json) {
    return this.persist({endpoint: `${json.event_type.id}`, json: json});
  }

  persist({endpoint = '', json, method = 'put'}: any) {
    return new Promise((resolve, reject) => {
      let data = {
        _method: method,
        authenticity_token: this.csrfToken()
      };

      if (json) {
        window.AppConfig.mergeJson(data, json);
      }

      $.ajax({
        url: `/event_types/${endpoint}`,
        type: 'POST',
        dataType: 'json',
        data: data
      }).done(result => {
        resolve(result);
      }).fail(result => {
        reject();
      });
    });
  }
}