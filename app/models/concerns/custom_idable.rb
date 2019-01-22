module CustomIdable
  extend ActiveSupport::Concern

  def set_attributes(params)
    params.each do |key, valueParams|
      if key.ends_with?('_attributes')
        methodName = key[0..-12]
        if send(methodName).is_a? Array
          ids = valueParams.values.pluck(:id)
          savedIds = send(methodName).where(:id.in => ids).map {|item| item.id.to_s}
          newIds = ids - savedIds
          newIds.each do |id|
            send(methodName) << methodName.classify.constantize.new(valueParams.to_h.values.find{ |v| v['id'] == id})
          end
          savedIds.each do |id|
            send(methodName).find(id).set_attributes(valueParams.to_h.values.find {|v| v['id'] == id})
          end
        else
          send(methodName).set_attributes(valueParams)
        end
      else
        send("#{key}=", valueParams)
      end
    end
  end

  def update_attributes(params)
    set_attributes(params)
    save
  end
end