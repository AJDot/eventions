module Enum
  def self.included(base)
    base.extend(ClassMethods)
  end

  module ClassMethods
    def enum_values(*args)
      all = {}

      args.each do |arg|
        arg.each do |key, value|
          define_singleton_method(key) do
            value
          end
          all[key] = value
        end
      end

      define_singleton_method("to_h") do
        all
      end

      define_singleton_method("[]") do |i|
        to_h.invert[i].to_s
      end
    end
  end
end