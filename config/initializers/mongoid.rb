module Mongoid
  module Document
    def as_json(options={})
      options[:except] ||= []
      options[:except] << :_id
      attrs = super(options)
      (id_keys - options[:except]).each do |key|
        attrs[key.to_s] = self[key].is_a?(Array) ? self[key].map(&:to_s) : self[key].to_s
      end
      attrs
    end

    private
    def id_keys
      @id_keys ||= attributes.keys.reduce([]) do |result, k|
        result << k.gsub(/\A_/, '').to_sym if k.match?(/.*_id\z/)
        result
      end
    end
  end
end
